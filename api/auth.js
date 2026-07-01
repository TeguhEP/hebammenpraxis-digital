module.exports = async function handler(req, res) {
  const { OAuthApp } = await import('@octokit/oauth-app');

  const app = new OAuthApp({
    clientType: 'oauth-app',
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  });

  const { code } = req.query;

  if (!code) {
    const { url } = app.getWebFlowAuthorizationUrl({ scopes: ['repo'] });
    return res.redirect(url);
  }

  try {
    const { authentication } = await app.createToken({ code });
    const msg = JSON.stringify({ token: authentication.token, provider: 'github' });
    return res.send(`<!DOCTYPE html><html><body><script>
      (function() {
        function receive(e) {
          window.opener.postMessage('authorization:github:success:' + '${msg}', e.origin);
        }
        window.addEventListener('message', receive, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    <\/script></body></html>`);
  } catch (err) {
    return res.status(400).send('OAuth error: ' + err.message);
  }
};