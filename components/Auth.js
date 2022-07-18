import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  useEffect(() => {
    window.addEventListener('message', async (evt) => {
      if (evt.data.keyri && evt.data.data && document.location.origin == evt.origin) {
        const { data } = evt;
        if (!data.error) {
          let refresh_token = JSON.parse(data.data).refreshToken;
          await handleQrLogin(refresh_token);
        } else if (data.error) {
          console.log(`Keyri error: ${data.message}`);
        }
      }
    });
  }, []);

  const handleSignUp = async (email, password) => {
    try {
      setRegisterLoading(true);
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQrLogin = async (refresh_token) => {
    try {
      setLoading(true);
      const { session, error } = await supabase.auth.setSession(refresh_token);
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='row flex flex-center'>
      <div className='col-6 form-widget'>
        <h1 className='header'>Supabase + Keyri</h1>
        <p className='description'>Sign in with email + password</p>
        <div>
          <input
            className='inputField'
            type='email'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='inputField'
            type='password'
            placeholder='Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            className='button block'
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Log in'}</span>
          </button>
        </div>

        <br />
        <br />

        <p className='description'>Sign up if you don&apos;t have an account yet</p>
        <div>
          <input
            className='inputField'
            type='email'
            placeholder='Your email'
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            className='inputField'
            type='password'
            placeholder='Your password'
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSignUp(registerEmail, registerPassword);
            }}
            className='button block'
            disabled={registerLoading}
          >
            <span>{registerLoading ? 'Loading' : 'Sign up'}</span>
          </button>
        </div>
      </div>
      <div className='col-4 form-widget'>
        <h1 className='header'>Keyri QR login!</h1>
        <p className='description'>Or sign in by scanning this QR code</p>
        <iframe
          title='KeyriQR'
          src='/KeyriQR.html?Environment=dev&Origin=keyri-example-web-supabase.vercel.app'
          id='qr-frame'
          height='300'
          width='300'
          scrolling='no'
          style={{ border: 'solid 5px white' }}
        ></iframe>
      </div>
    </div>
  );
}
