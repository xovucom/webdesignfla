// src/pages/api/auth.js

const client_id = import.meta.env.OAUTH_CLIENT_ID;
const client_secret = import.meta.env.OAUTH_CLIENT_SECRET;
const redirect_uri = 'https://api.decapcms.org/auth/callback'; // This must remain the same

export async function GET({ url }) {
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response(JSON.stringify({ error: 'No code provided' }), { status: 400 });
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
      redirect_uri,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return new Response(JSON.stringify(data), { status: 400 });
  }

  // This is the required format for the Decap CMS callback
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Authentication Success</title>
      </head>
      <body>
        <script>
          const opener = window.opener;
          if (opener) {
            opener.postMessage(
              'authorization:github:success:${JSON.stringify(data)}',
              '*'
            );
            window.close();
          }
        </script>
        <p>Authentication successful. Please return to the CMS.</p>
      </body>
    </html>
  `;

  return new Response(content, {
    headers: { 'Content-Type': 'text/html' },
  });
}