# 🚀 Node.js TypeScript Template

A modern boilerplate for building scalable Node.js applications using TypeScript.  
Includes best practices like module structure, environment configuration, linting, and script automation.

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
