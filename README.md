# I. Pre-requisites

Before you use this project, you only install NodeJs (version >= 18)  in your computer

# II. Installation
## 1. Install NodeJs

- Go to https://nodejs.org/en/download/ and download the latest version of NodeJs
- Check the version of NodeJs
```bash
node -v
```
## 2. Install yarn

```bash
npm install -g yarn
```

# III. Project Structure

```
cypress/
├── configs                                     # configuration specific environment
├── e2e                                         # test cases folder
│   ├── api                                     # API test cases
│   └── ui                                      # UI test cases
├── fixtures                                    # test data
├── page-objects                                # page objects folder
│   ├── locators                                # locators folder
│   │   ├── book-locator.ts
│   │   ├── common-locator.ts
│   │   └── ...
│   └── pages                                   # pages folder
│       ├── base-page.ts
│       ├── book-page.ts
│       └── ...
├── tsconfig.json                               # typescript config file
└── utils                                       # store all common methods/libraries
    ├── api                                     # API folder
    │   ├── endpoints                           # API endpoints
    │   │   ├── book-endpoint.ts
    │   │   └── user-endpoint.ts
    │   └── services                            # services folder
    │       ├── book-service.ts
    │       └── user-service.ts
    ├── constants                               # project constants
    │   ├── message.ts
    │   ├── status-code.ts
    │   └── url.ts
    ├── helpers                                 # helpers folder
    │   ├── api-helper.ts
    │   ├── request-helper.ts
    │   ├── setup-helper.ts
    │   └── user-token-helper.ts
    └── interfaces                              # project interfaces
        ├── IBook.ts
        ├── IError.ts
        ├── IRequest.ts
        └── IUser.ts
```

# IV. Usage
## 1. Run test, generate and open report

```bash
yarn test
allure open cypress/reports/allure-reports
```

## 2. Run with tags

- Enable the tests with tag "@login" or "@deleteBook"
```bash
--env grepTags="@login @deleteBook"
```
- Enable the tests with both tags "login" and "delete"
```bash
--env grepTags="@login+@deleteBook"
```
- Enable the tests with "login" in the title and tag "@smoke"
```bash
--env grep=login,grepTags="@smoke"
```
## 3. Multiple Environments
yarn cy:run --config-file .\cypress\configs\cypress.prod.js

## 4. Cross Browser
- Default, Cypress run in Electron browser
```bash
yarn cy:run --browser chrome
yarn cy:run --browser firefox
```

## 5. Headed - Headless
- Default, Cypress will run in headless mode
```bash
yarn cy:run --browser firefox --headed
```

## 6. Running Cypress in Continuous Integration (CI)
+ In this framework, I have used Azure Pipeline to define the below workflows:
    - Install dependencies
    - Run test

# V. References

1. Cypress document: https://docs.cypress.io/
2. Plugin Allure: https://www.npmjs.com/package/@shelex/cypress-allure-plugin
3. Plugin Grep: https://github.com/cypress-io/cypress/tree/develop/npm/grep
4. Prettier: https://prettier.io/docs/en/options.html
5. Set up CI: https://docs.cypress.io/guides/continuous-integration/introduction#Setting-up-CI
6. Custom JS with Azure: https://learn.microsoft.com/en-us/azure/devops/pipelines/ecosystems/customize-javascript?view=azure-devops
7. Node.js tool installer: https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/node-tool-v0?view=azure-pipelines
8. Run with tags: https://github.com/cypress-io/cypress/tree/develop/npm/grep