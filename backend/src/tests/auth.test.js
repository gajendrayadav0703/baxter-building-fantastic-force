import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { requireRole } from '../middleware/roleMiddleware.js';
import { loginSchema, registerSchema } from '../validators/authValidator.js';

describe('authValidator', () => {
  it('accepts valid registration payload and normalizes email/username', () => {
    const result = registerSchema.safeParse({
      name: '  Reed Richards  ',
      username: '  MrFantastic  ',
      email: '  Reed@Baxter.Nexus  ',
      password: 'strongpassword123',
    });

    assert.equal(result.success, true);
    assert.equal(result.data.name, 'Reed Richards');
    assert.equal(result.data.username, 'mrfantastic');
    assert.equal(result.data.email, 'reed@baxter.nexus');
  });

  it('rejects short password on registration', () => {
    const result = registerSchema.safeParse({
      name: 'Sue Storm',
      username: 'invisible',
      email: 'sue@baxter.nexus',
      password: '123',
    });

    assert.equal(result.success, false);
  });

  it('requires identifier and password on login', () => {
    const emptyResult = loginSchema.safeParse({ identifier: '', password: '' });
    assert.equal(emptyResult.success, false);

    const validResult = loginSchema.safeParse({
      identifier: 'commander',
      password: 'secret',
    });
    assert.equal(validResult.success, true);
  });
});

describe('requireRole middleware', () => {
  it('returns 403 when user role is not allowed', () => {
    const middleware = requireRole('commander');
    const req = { user: { role: 'operator' } };
    let statusCode = null;
    let body = null;
    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(payload) {
        body = payload;
        return this;
      },
    };

    let nextCalled = false;
    middleware(req, res, () => {
      nextCalled = true;
    });

    assert.equal(nextCalled, false);
    assert.equal(statusCode, 403);
    assert.equal(body.success, false);
  });

  it('calls next when user role is allowed', () => {
    const middleware = requireRole('commander', 'operator');
    const req = { user: { role: 'commander' } };
    const res = {};
    let nextCalled = false;

    middleware(req, res, () => {
      nextCalled = true;
    });

    assert.equal(nextCalled, true);
  });
});
