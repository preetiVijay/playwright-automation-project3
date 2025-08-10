# Playwright Automation Project - with Docker

## Project Description
This project demonstrates automated web application testing using Playwright Framework. It includes sample tests with Page Object Model design. The tests target [Automation Exercise](http://automationexercise.com) and showcase both local and Docker-based CI execution.

## Features
- End-to-end tests for user login, registration, and account deletion
- Page Object Model for maintainable test code
- CI/CD integration via GitHub Actions (with and without Docker)
- HTML test reports and trace collection for debugging

## Setup Instructions

### Prerequisites
- Node.js (v24 or above)
- npm (Node Package Manager)
- Docker (optional, for containerized runs)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/playwright-automation-project3.git
   cd playwright-automation-project3
   ```

2. Install dependencies:
   ```
   npm ci
   ```

3. Install Playwright browsers:
   ```
   npx playwright install --with-deps
   ```

### Running Tests Locally
Run all tests:
```
npx playwright test
```

Run a specific test file:
```
npx playwright test tests/login.spec.ts
```

View HTML report after tests:
```
npx playwright show-report
```

### Running Tests in Docker
Build and run the Docker container:
```
docker build -t playwright-test .
docker run --rm playwright-test
```

### CI/CD Integration
- GitHub Actions workflows are provided:
  - `.github/workflows/playwright.yml` (Docker-based)
  - `.github/workflows/playwrightWithoutDocker.yml` (direct Node.js)

### Project Structure
- `tests/` - Test specs
- `pageobjects/` - Page Object Model classes
- `playwright.config.ts` - Playwright configuration
- `DockerFile` - Docker setup for CI/CD
- `.github/workflows/` - CI/CD workflows

## Additional Notes
- Update credentials and test data as needed for your environment.
- For troubleshooting, check Playwright HTML reports and traces in the `playwright-report/` directory.