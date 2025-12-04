# Contributing to LionsMax

First off, thank you for considering contributing to LionsMax! It's people like you that make LionsMax such a great platform for the 40+ wellness community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🤔 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why would this be useful?
- **Possible implementation** - if you have ideas

### Pull Requests

- Fill in the required template
- Follow the coding standards
- Include tests if applicable
- Update documentation as needed

## 🛠️ Development Setup

1. **Fork and clone** the repository
   ```bash
   git clone https://github.com/YOUR-USERNAME/lionsmax-restart.git
   cd lionsmax-restart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 💻 Coding Standards

### TypeScript

- Use **TypeScript** for all new files
- Define proper **types and interfaces**
- Avoid `any` type when possible
- Use **functional components** with hooks

### Code Style

- Follow the **.eslintrc.json** configuration
- Use **Prettier** for formatting (`.prettierrc`)
- **2 spaces** for indentation
- **Single quotes** for strings
- **Semicolons** are required

### Component Structure

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
  count?: number;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  count = 0 
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <span>{count}</span>
    </div>
  );
};
```

### File Naming

- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAffiliate.ts`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`)
- **Types**: PascalCase (e.g., `Product`, `User`)

## 📝 Commit Guidelines

We follow the **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(affiliate): add commission tracking to dashboard

Implemented a new dashboard widget that displays:
- Total commissions this month
- Top performing products
- Conversion rate

Closes #123
```

```bash
fix(ui): resolve mobile menu not closing on link click

The mobile navigation menu was staying open after clicking a link.
Added onClick handler to close the menu.

Fixes #456
```

## 🔄 Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add tests** if you're adding features
3. **Update CHANGELOG.md** following Keep a Changelog format
4. **Ensure all tests pass** (`npm test`)
5. **Ensure linting passes** (`npm run lint`)
6. **Get approval** from at least one maintainer

### PR Title Format

Use the same format as commit messages:

```
feat(component): add new feature
fix(component): resolve bug
docs: update README
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings generated
```

## 🧪 Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for >70% code coverage
- Test on multiple browsers/devices

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Type checking
npm run type-check
```

## 📚 Documentation

- Update README.md if needed
- Add JSDoc comments for complex functions
- Update relevant guides in `/docs`
- Include inline comments for complex logic

## 🎨 Design Guidelines

- Follow existing UI patterns
- Maintain accessibility (WCAG 2.1 AA)
- Test on mobile and desktop
- Use Tailwind CSS utilities
- Avoid inline styles

## ❓ Questions?

- Check existing documentation in `/docs`
- Search existing GitHub issues
- Ask in GitHub Discussions
- Contact maintainers

## 🙏 Thank You!

Your contributions make LionsMax better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🚀**
