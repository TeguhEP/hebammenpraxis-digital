module.exports = async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const { code } = req.query;

  if (!code) {
    const authUrl =
      'https://github.com/login/oauth/authorize' +
      '?client_id=' + clientId +
      '&scope=repo';
    return res.redirect(authUrl);
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const data = await tokenRes.json();

    if (data.error) {
      return res.status(400).send(
        'OAuth error: ' + data.error + ' — ' + (data.error_description || '')
      );
    }

    const token = data.access_token;
    const msg = JSON.stringify({ token: token, provider: 'github' });

    return res.send(
      '<!DOCTYPE html><html><body><script>' +
      '(function() {' +
      '  function receive(e) {' +
      '    window.opener.postMessage("authorization:github:success:" + JSON.stringify(' + JSON.stringify({ token: token, provider: 'github' }) + '), e.origin);' +
      '  }' +
      '  window.addEventListener("message", receive, false);' +
      '  window.opener.postMessage("authorizing:github", "*");' +
      '})();' +
      '<\/script></body></html>'
    );
  } catch (err) {
    return res.status(500).send('Server error: ' + err.message);
  }
};