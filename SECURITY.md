# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take the security of LionsMax seriously. If you discover a security vulnerability, please follow these steps:

1.  **Do not open a public issue.** Publicly reporting a vulnerability can put the community at risk.
2.  **Email us privately.** Send a detailed report to [security@lionsmax.com](mailto:security@lionsmax.com) (or the maintainer's email).
3.  **Include details.** Please provide as much information as possible, including:
    *   Type of vulnerability (e.g., XSS, SQL Injection)
    *   Steps to reproduce
    *   Affected components or versions
    *   Proof of concept (if available)

### Response Timeline

*   **Acknowledgment:** We will acknowledge your report within 48 hours.
*   **Assessment:** We will assess the severity and impact within 1 week.
*   **Fix:** We will aim to release a patch or mitigation within 2 weeks for critical issues.

### Disclosure Policy

We follow a **Responsible Disclosure** policy:
*   We ask that you give us reasonable time to fix the issue before making it public.
*   We will notify you when the fix is released.
*   We will credit you for your discovery (unless you prefer to remain anonymous).

## Security Best Practices for Contributors

*   **No Secrets in Code:** Never commit API keys, passwords, or tokens. Use environment variables (`.env.local`).
*   **Dependency Updates:** We use Dependabot to keep dependencies secure. Please review and merge security updates promptly.
*   **Code Review:** All changes are subject to code review to identify potential security flaws.

Thank you for helping keep LionsMax secure!
