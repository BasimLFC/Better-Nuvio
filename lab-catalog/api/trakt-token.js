// Somente a troca de codigo/refresh fica no servidor. O segredo nunca e
// entregue ao cliente, ao catalogo estatico ou ao pacote webOS.
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  const { TRAKT_CLIENT_ID, TRAKT_CLIENT_SECRET, NUVIO_SUPABASE_URL,
    NUVIO_SUPABASE_ANON_KEY } = process.env;
  if (!TRAKT_CLIENT_ID || !TRAKT_CLIENT_SECRET || !NUVIO_SUPABASE_URL || !NUVIO_SUPABASE_ANON_KEY)
    return res.status(503).json({ error: 'service_unavailable' });
  const bearer = req.headers.authorization;
  if (typeof bearer !== 'string' || !/^Bearer [A-Za-z0-9._-]+$/.test(bearer))
    return res.status(401).json({ error: 'unauthorized' });
  try {
    const userResponse = await fetch(`${NUVIO_SUPABASE_URL.replace(/\/$/, '')}/auth/v1/user`, {
      headers: { apikey: NUVIO_SUPABASE_ANON_KEY, Authorization: bearer },
      signal: AbortSignal.timeout(10000),
    });
    if (!userResponse.ok) return res.status(401).json({ error: 'unauthorized' });
    const user = await userResponse.json();
    if (!user.id || user.is_anonymous === true) return res.status(401).json({ error: 'unauthorized' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || typeof body !== 'object') return res.status(400).json({ error: 'invalid_request' });
    let path, payload;
    if (typeof body.code === 'string' && /^[A-Za-z0-9_-]{1,160}$/.test(body.code)) {
      path = '/oauth/device/token';
      payload = { code: body.code, client_id: TRAKT_CLIENT_ID, client_secret: TRAKT_CLIENT_SECRET };
    } else if (typeof body.refresh_token === 'string' && /^[A-Za-z0-9._-]{1,500}$/.test(body.refresh_token)) {
      path = '/oauth/token';
      payload = { refresh_token: body.refresh_token, client_id: TRAKT_CLIENT_ID,
        client_secret: TRAKT_CLIENT_SECRET, redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
        grant_type: 'refresh_token' };
    } else {
      return res.status(400).json({ error: 'invalid_request' });
    }
    const traktResponse = await fetch(`https://auth.trakt.tv${path}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json',
        'trakt-api-version': '2', 'trakt-api-key': TRAKT_CLIENT_ID },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(15000),
    });
    const response = await traktResponse.text();
    res.status(traktResponse.status).setHeader('Content-Type', 'application/json').send(response);
  } catch {
    res.status(502).json({ error: 'upstream_unavailable' });
  }
}
