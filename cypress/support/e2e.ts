import './commands';
import '@shelex/cypress-allure-plugin';
import setupHelper from '../utils/helpers/setup-helper';

const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

// Hide the XHR request in log Cypress when run command `cypress open`
setupHelper.hideLogRequest(
	'hideXHR',
	'command',
	'request > .command-state-failed'
);

// Hide the uncaught exception in log Cypress when run command `cypress open`
setupHelper.hideLogRequest('hideException', 'exception', 'uncaught-exception');

// Hide the page load in log Cypress when run command `cypress open`
setupHelper.hideLogRequest('hidePageLoad', 'page-load', 'page-load');

// @ts-ignore
Cypress.on('uncaught:exception', (e: Error): boolean => {
	return false;
});
