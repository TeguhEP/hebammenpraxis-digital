module.exports = async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    const params = new URLSearchParams({
      client_id: clientId,
      scope: 'repo',
    });
    return res.redirect(`https://github.com/login/oauth/authorize?${params}`);
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  const token = await tokenRes.json();

  if (token.error) {
    return res.status(400).send('OAuth error: ' + token.error_description);
  }

  const msg = JSON.stringify({ token: token.access_token, provider: 'github' });
  return res.send(`<!DOCTYPE html><html><body><script>
    (function() {
      function receive(e) {
        window.opener.postMessage('authorization:github:success:' + '${msg}', e.origin);
      }
      window.addEventListener('message', receive, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  <\/script></body></html>`);
}