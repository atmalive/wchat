# 🚀 Проект Vite + React – Веб-версия WhatsApp

Этот проект представляет собой веб-версию WhatsApp, использующую API от [Green API](https://console.green-api.com/auth).

## 📌 Требования

Перед использованием убедитесь, что у вас:

1. **Есть аккаунт** на [Green API](https://console.green-api.com/auth).
2. **Создан Instance**, привязанный к вашему мобильному номеру.
3. **Включены настройки получения сообщений в Webhooks**:
    - ✅ *Receive webhooks on incoming messages and files*
    - ✅ *Receive webhooks on sent messages statuses*

## 📥 Установка и запуск

### 🔗 Код на GitHub

[Репозиторий проекта](https://github.com/atmalive/wchat)

### 🛠 Локальный запуск

1. **Клонируем репозиторий**:
   ```sh
   git clone <URL_РЕПОЗИТОРИЯ>
   cd wchat
   ```

2. **Устанавливаем зависимости**:
   ```sh
   npm install
   ```

3. **Запускаем локальный сервер**:
   ```sh
   npm run dev
   ```

### 🌍 Онлайн-версия

Вы также можете использовать развернутую версию по ссылке:  
[🔗 wchat-mu.vercel.app](https://wchat-mu.vercel.app/)

## 🚀 Использование

1. Введите **idInstance** и **apiTokenInstance**.
2. Укажите контакт для общения.
3. Начните отправку сообщений!