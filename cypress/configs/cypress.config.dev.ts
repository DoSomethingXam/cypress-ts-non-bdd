import { defineConfig } from 'cypress';
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			allureWriter(on, config);
			require('@cypress/grep/src/plugin')(config);
			return config;
		},
		baseUrl: 'https://demoqa.com',
		watchForFileChanges: false,
		viewportWidth: 1920,
		viewportHeight: 1080,
		blockHosts: [
			'*.google-analytics.com',
			'*.googlesyndication.com',
			'serving.stat-rock.com',
			'securepubads.*.net',
		],
		env: {
			hideXHR: true,
			hideException: true,
			hidePageLoad: true,
			apiUrl: 'https://demoqa.com',
			"allureResultsPath": 'cypress/reports/allure-results',
			"grepFilterSpecs": true,
			"grepOmitFiltered": true,
		},
	},
});
