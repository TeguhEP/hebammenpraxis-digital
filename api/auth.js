module.exports = async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const redirectUri = 'https://www.hebammenpraxis-digital.de/api/auth';
  const { code } = req.query;

  console.log('Request hit. Code present:', !!code);

  if (!code) {
    const params = new URLSearchParams({
      client_id: clientId,
      scope: 'repo',
      redirect_uri: redirectUri,
    });
    return res.redirect('https://github.com/login/oauth/authorize?' + params.toString());
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
        redirect_uri: redirectUri,
      }),
    });

    const data = await tokenRes.json();
    console.log('GitHub response:', data.error || 'success');

    if (data.error) {
      return res.status(400).send('OAuth error: ' + data.error + ' \u2014 ' + (data.error_description || ''));
    }

    const token = data.access_token;
    const content = JSON.stringify({ token: token, provider: 'github' });

    return res.send(
      '<!DOCTYPE html><html><body><script>' +
      '(function(){' +
      'function receive(e){' +
      'window.opener.postMessage(' +
      '"authorization:github:success:' + content.replace(/"/g, '\\"') + '",' +
      'e.origin' +
      ');' +
      '}' +
      'window.addEventListener("message",receive,false);' +
      'window.opener.postMessage("authorizing:github","*");' +
      '})();' +
      '<\/script></body></html>'
    );
  } catch (err) {
    console.log('Error:', err.message);
    return res.status(500).send('Server error: ' + err.message);
  }
};