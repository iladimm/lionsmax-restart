# Getting Started with LionsMax

Welcome to the LionsMax developer documentation! This guide will help you set up your development environment and start contributing.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**
- A code editor (VS Code recommended)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iladimm/lionsmax-restart.git
   cd lionsmax-restart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Open `.env.local` and fill in your credentials:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `VITE_GEMINI_API_KEY`: Google Gemini API key for AI features

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app should now be running at `http://localhost:5173`.

## 🧪 Running Tests

We use **Vitest** for unit testing.

- Run all tests: `npm test`
- Run tests with coverage: `npm run test:coverage`

## 🔍 Code Quality

We use **ESLint** and **Prettier** to maintain code quality.

- Lint code: `npm run lint`
- Format code: `npm run format`

## 🏗️ Project Structure

- `/src`: Source code
  - `/components`: React components
  - `/hooks`: Custom hooks
  - `/pages`: Route pages
  - `/lib`: Utility libraries (Supabase, etc.)
- `/docs`: Documentation
- `/database`: SQL schemas

## 📚 Next Steps

- Read the [Architecture Overview](../architecture/overview.md)
- Check out the [Contributing Guide](../../CONTRIBUTING.md)
