# API and UI Testing Framework with Playwright

This project is a testing framework using [Playwright](https://playwright.dev/) for both API and UI testing. It is designed to be flexible, dynamic, and configured for GitHub Actions CI integration. Separate workflows and reports are generated for API and UI tests.

## Table of Contents
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Running Tests Locally](#running-tests-locally)
- [Running Tests on CI](#running-tests-on-ci)
- [Test Reporting](#test-reporting)
- [Troubleshooting](#troubleshooting)

---

## Setup

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright Browsers**:
   ```bash
   npx playwright install
   ```

---

## Project Structure

The project is structured to separate API and UI tests:

```plaintext
.
├── .github/                      # GitHub Actions or workflows
│   └── ...                       # Workflow files for CI/CD
├── data/                         # Data files or configuration
│   └── userData.js               # User data for tests
├── helpers/                      # Helper functions and utilities
│   ├── functions/
│   │   └── product.js            # Product-related helper functions
│   └── ...                       # Other helper files
├── pages/                        # Page Object Model (POM) files for UI testing
│   ├── loginpage.js              # Login page object
│   └── productspage.js           # Products page object
├── schemas/                      # JSON schema files for API response validation
│   └── post.js                   # JSON schema for post-related API responses
├── tests/                        # All test files
│   ├── api-tests/                # API test cases
│   │   └── example.api.test.js   # Example API test file
│   ├── ui-tests/                 # UI test cases
│   │   └── example.ui.test.js    # Example UI test file
├── .gitignore                    # Git ignore file
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Lock file for project dependencies
├── playwright.config.js          # Playwright configuration file
└── README.md                     # Project documentation

```

- `api-tests/`: Contains all API test files.
- `ui-tests/`: Contains all UI test files.
- `playwright.config.js`: Configurations for separate API and UI test projects, including reporter and filtering settings.

---

## Running Tests Locally

1. **Run API Tests**:
   ```bash
   npm run test:api
   ```

2. **Run UI Tests**:
   ```bash
   npm run test:ui
   ```

Reports will be generated in the `playwright-report` directory for both test types.

---

## Running Tests on CI

The project includes two GitHub Actions workflows, one for API tests and one for UI tests, both triggered by pushes to the `main` branch.
Each workflow will:
- Run the respective tests (API or UI) on pushes to `main`
- Upload separate reports for each type of test as artifacts in GitHub Actions

---

## Test Reporting

- **Local Reporting**: HTML reports are generated in the `playwright-report` directory by default. Each test type has its own output directory for separate reports.
- **CI Reporting**: Reports are uploaded as artifacts in GitHub Actions. You can download the `api-report` and `ui-report` from the Actions tab for detailed results.

---

## Troubleshooting

If you encounter issues, try the following steps:
- Ensure all dependencies are installed with `npm install`.
- Check that `playwright.config.js` has the correct base URLs and configurations.
