import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    window.addEventListener('message', async (evt) => {
      if (evt.data.keyri && evt.data.data && document.location.origin == evt.origin) {
        const { data } = evt;

        if (!data.error) {
          let refresh_token = JSON.parse(data.data).data.token.refreshToken;
          console.log(refresh_token);
          handleQrLogin(refresh_token);
        } else {
          alert('Keyri error');
        }
      }
    });
  }, []);

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
      const { user, session, error } = await supabase.auth.signIn({ refresh_token });
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
        <h1 className='header'>Supabase + Next.js</h1>
        <p className='description'>Sign in via email and password</p>
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
      </div>
      <div className='col-1 form-widget'>
        <iframe
          title='KeyriQR'
          src='/KeyriQR.html'
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
