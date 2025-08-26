import { test, expect } from '@playwright/test';

const BASE_URL = 'https://edge.qiwi.com';
const TOKEN = process.env.QIWI_TOKEN as string;
const WALLET_ID = process.env.WALLET_ID as string;

test.describe('QIWI Payout API', () => {

  test('Health check', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/payout/v1/persons`);
    expect(res.status()).toBe(200);
  });

  test('Balance > 0', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/funding-sources/v2/persons/${WALLET_ID}/accounts`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    expect(res.status()).toBe(200);

    const data = await res.json();
    const balance = data.accounts[0].balance.amount;
    expect(balance).toBeGreaterThan(0);
  });

  test('Create payment (1 RUB)', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/sinap/api/v2/terms/99/payments`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        id: Date.now().toString(),
        sum: { amount: 1.00, currency: "643" },
        fields: { account: "79990000000" }
      }
    });
    expect(res.status()).toBe(200);
  });

  test('Check payment status', async ({ request }) => {
    const paymentId = process.env.PAYMENT_ID as string;
    const res = await request.get(`${BASE_URL}/sinap/api/v2/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    expect(res.status()).toBe(200);

    const data = await res.json();
    expect(data.status.value).toBe('SUCCESS');
  });

});
