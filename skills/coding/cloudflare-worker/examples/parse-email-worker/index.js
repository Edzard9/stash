// Minimal Cloudflare Worker in the house shape: a tiny router, a health
// route, and one API route. The parse-email route demonstrates the
// decode-on-intake rule: email bodies often arrive base64-wrapped, so
// decoding happens where the body enters, never at render time (the
// bug that once made HTML mail display as raw base64).

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'content-type': 'application/json' },
  });
}

function looksLikeBase64(s) {
  const t = s.replace(/\s+/g, '');
  return t.length >= 8 && t.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(t);
}

function decodeBase64(s) {
  const bin = atob(s.replace(/\s+/g, ''));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8').decode(bytes);
}

export async function handle(request) {
  const url = new URL(request.url);

  if (request.method === 'GET' && url.pathname === '/health') {
    return json({ ok: true, service: 'parse-email-demo' });
  }

  if (request.method === 'POST' && url.pathname === '/api/parse-email') {
    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return json({ error: 'invalid JSON body' }, 400);
    }
    const body = typeof payload.body === 'string' ? payload.body : '';
    const hinted = /base64/i.test(payload.contentType || '');
    let text = body;
    let encoding = 'plain';
    if (hinted || looksLikeBase64(body)) {
      try {
        text = decodeBase64(body);
        encoding = 'base64';
      } catch (e) {
        text = body;
        encoding = 'plain';
      }
    }
    const m = text.match(/\b(\d{6})\b/);
    return json({ text: text, otp: m ? m[1] : null, encoding: encoding });
  }

  return json({ error: 'not found' }, 404);
}

export default { fetch: handle };
