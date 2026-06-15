const http = require('http');

const BASE = 'http://localhost:3001';
let cookies = '';

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      headers: {
        Cookie: cookies,
        ...(body
          ? {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(body),
            }
          : {}),
      },
    };

    const req = http.request(options, (res) => {
      const setCookie = res.headers['set-cookie'];
      if (setCookie) {
        cookies = setCookie.map((c) => c.split(';')[0]).join('; ');
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function encodeForm(fields) {
  return Object.entries(fields)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

async function run() {
  let res;

  res = await request('GET', '/');
  if (res.status !== 302 || !res.headers.location.includes('/login')) {
    throw new Error(`GET / failed: ${res.status} ${res.headers.location}`);
  }
  console.log('PASS: GET / redirects to login');

  res = await request('GET', '/register');
  if (res.status !== 200 || !res.body.includes('Register')) {
    throw new Error('GET /register failed');
  }
  console.log('PASS: GET /register');

  res = await request(
    'POST',
    '/register',
    encodeForm({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    })
  );
  if (res.status !== 302) {
    throw new Error(`POST /register failed: ${res.status}`);
  }
  console.log('PASS: POST /register');

  res = await request(
    'POST',
    '/login',
    encodeForm({ email: 'test@example.com', password: 'password123' })
  );
  if (res.status !== 302) {
    throw new Error(`POST /login failed: ${res.status}`);
  }
  console.log('PASS: POST /login');

  res = await request('GET', '/');
  if (res.status !== 200 || !res.body.includes('test@example.com')) {
    throw new Error(`GET / (auth) failed: status=${res.status}`);
  }
  console.log('PASS: GET / shows user email');

  res = await request('POST', '/logout');
  if (res.status !== 302) {
    throw new Error(`POST /logout failed: ${res.status}`);
  }
  console.log('PASS: POST /logout');

  res = await request('GET', '/');
  if (res.status !== 302) {
    throw new Error('GET / after logout should redirect');
  }
  console.log('PASS: GET / after logout redirects');

  console.log('\nAll smoke tests passed.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
