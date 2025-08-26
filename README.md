# QIWI Payout API Tests

## 📂 Структура
- `postman/qiwi_payout_collection.json` — Postman коллекция с тестами
- `playwright/tests/qiwi.payout.spec.ts` — Playwright тесты

## 🚀 Запуск Postman
1. Импортировать коллекцию в Postman
2. Указать переменные окружения `QIWI_TOKEN`, `walletId`, `paymentId`
3. Запустить тесты

## 🚀 Запуск Playwright
```bash
npm install
npx playwright test
```

Перед запуском создать `.env`:
```
QIWI_TOKEN=ваш_токен
WALLET_ID=номер_кошелька
PAYMENT_ID=идентификатор_платежа
```
