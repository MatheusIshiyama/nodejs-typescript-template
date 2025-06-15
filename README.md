<h1 align="center">🚀 Node.js TypeScript Template</h1>

<p align="center">
  <img src="https://img.shields.io/badge/node.js-%3E=18.x-brightgreen?logo=node.js&style=for-the-badge" alt="Node.js" />
  <img src="https://img.shields.io/badge/typescript-4.x-blue?logo=typescript&style=for-the-badge" alt="TypeScript" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License: MIT" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge" alt="PRs welcome" />
  <img src="https://img.shields.io/github/last-commit/MatheusIshiyama/nodejs-typescript-template?style=for-the-badge" alt="Last Commit" />
</p>

<p align="center">
  A modern boilerplate for building scalable Node.js applications using TypeScript.<br/>
  Includes best practices like module structure, environment configuration, linting, and script automation.
</p>

---

## 📦 Tech Stack

- **Node.js**
- **TypeScript**
- **ESLint + Prettier**
- **Dotenv** for environment variables
- **PNPM / Yarn / NPM** support

---

## ⚙️ Features

- 📁 Structured project layout (`src/`, `config/`, `routes/`, `services/`)
- 🔒 `.env` environment support via `dotenv`
- 🧹 Code linting and formatting (`eslint`, `prettier`)
- 🧪 Easy testing-ready setup (add Jest if needed)
- 📜 Ready-to-use `tsconfig.json`
- ⚡ Auto-build via `tsc` or `ts-node-dev`

---

## 📂 Project Structure

```bash
nodejs-typescript-template/
├── src/
│   ├── config/         # Environment and app configs
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic or handlers
│   └── index.ts        # Entry point
├── .env                # Environment variables
├── .eslintrc.cjs       # Linting rules
├── tsconfig.json       # TypeScript config
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/MatheusIshiyama/nodejs-typescript-template.git
cd nodejs-typescript-template
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn
```

### 3. Setup environment

Create a `.env` file in the root and define your variables:

```
PORT=3000
```

### 4. Run the project

```bash
pnpm dev
# or
npm run dev
```

---

## 🛠 Available Scripts

| Command         | Description                          |
|----------------|--------------------------------------|
| `dev`          | Run in development mode using `ts-node-dev` |
| `build`        | Compile TypeScript to JavaScript     |
| `start`        | Run compiled JS from `dist/`         |
| `lint`         | Check linting issues                 |
| `format`       | Format code using Prettier           |

---

## ✅ To-Do / Next Steps

- [ ] Add Jest and supertest for unit/integration tests
- [ ] Add CI workflow (`.github/workflows`)
- [ ] Add Docker support
- [ ] Add Swagger/OpenAPI docs

---

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by [Matheus Ishiyama](https://github.com/MatheusIshiyama)
