import worker from './index.js';

function assert(cond, msg) {
  if (!cond) { console.error('FAIL: ' + msg); process.exitCode = 1; }
  else { console.log('PASS: ' + msg); }
}

// 1. health
let res = await worker.fetch(new Request('http://local/health'), {}, {});
let data = await res.json();
console.log('GET /health ->', res.status, JSON.stringify(data));
assert(res.status === 200 && data.ok === true, 'health OK');

// 2. plain body with OTP
res = await worker.fetch(new Request('http://local/api/parse-email', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ contentType: 'text/plain', body: 'Your login code is 731204. Do not share it.' }),
}), {}, {});
data = await res.json();
console.log('POST plain ->', JSON.stringify(data));
assert(data.otp === '731204', 'plain body OTP extracted (731204)');
assert(data.encoding === 'plain', 'plain body kept as plain');

// 3. base64 body (the decode-on-intake case)
const raw = 'Subject: Verify your sign-in\n\nYour OTP is 482916 - valid for 10 minutes.';
const b64 = Buffer.from(raw, 'utf-8').toString('base64');
res = await worker.fetch(new Request('http://local/api/parse-email', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ contentType: 'text/html; charset=utf-8', body: b64 }),
}), {}, {});
data = await res.json();
console.log('POST base64 ->', JSON.stringify(data));
assert(data.encoding === 'base64', 'base64 body detected');
assert(data.text.includes('Your OTP is 482916'), 'base64 body decoded to readable text');
assert(data.otp === '482916', 'OTP extracted from decoded body (482916)');

// 4. unknown route
res = await worker.fetch(new Request('http://local/nope'), {}, {});
console.log('GET /nope ->', res.status);
assert(res.status === 404, 'unknown route 404');

console.log('WORKER TEST DONE');
