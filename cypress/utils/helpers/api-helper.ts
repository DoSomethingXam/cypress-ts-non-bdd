const apiHelper = {
  getApiUrl() {
    return Cypress.env("apiUrl");
  },
};

export default apiHelper;
