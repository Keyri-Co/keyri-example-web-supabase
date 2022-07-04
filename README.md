## A demonstration of how Keyri QR login works with Supabase.

This example uses Next.js but the code can be used with any React-based project.

The key things to note are:

- KeyriQR.html is saved in the public director
- The Auth.js component has the following Keyri-specific modifications:
  - We've added an event listener inside a `useEffect` hook to listen for the "Keyri message" event
    - This event listener calls the new `handleQrLogin` function and passes into it the `refreshToken` passed to it from the mobile app
  - The `handleQrLogin` function uses Supabase's `auth.setSession` function to log the user in using the `refreshToken` passed to it

Live demo is located here: https://keyri-example-web-supabase.vercel.app/

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run it locally

This won't show off Keyri QR login, since the Keyri widget needs to be hosted on an actual public domain. To make the normal Supabase username+password login work, change your `createClient` variables to those of your own Supabase account.

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
