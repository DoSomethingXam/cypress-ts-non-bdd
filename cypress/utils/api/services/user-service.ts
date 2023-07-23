import { userEndpoint } from "../endpoints/user-endpoint";
import apiHelper from "../../helpers/api-helper";
import requestHelper from "../../helpers/request-helper";
import userTokenHelper from "../../helpers/user-token-helper";

export const userService = {
  authorizedUser(
    username: string,
    password: string
  ): Cypress.Chainable<Cypress.Response<any>> {
    const url: string =
      apiHelper.getApiUrl() + userEndpoint.AUTHORIZED_ENDPOINT;
    return requestHelper.sendPostMethod({
      url: url,
      body: {
        userName: username,
        password: password,
      },
    });
  },

  generateToken(
    username: string,
    password: string
  ): Cypress.Chainable<Cypress.Response<any>> {
    const url: string =
      apiHelper.getApiUrl() + userEndpoint.GENERATE_TOKEN_ENDPOINT;
    return requestHelper.sendPostMethod({
      url: url,
      body: {
        userName: username,
        password: password,
      },
    });
  },

  createUser(
    username: string,
    password: string
  ): Cypress.Chainable<Cypress.Response<any>> {
    const url: string =
      apiHelper.getApiUrl() + userEndpoint.CREATE_USER_ENDPOINT;
    return requestHelper.sendPostMethod({
      url: url,
      body: {
        userName: username,
        password: password,
      },
    });
  },

  getUser(userId: string): Cypress.Chainable<Cypress.Response<any>> {
    const url: string =
      apiHelper.getApiUrl() + userEndpoint.GET_USER_ENDPOINT(userId);
    return requestHelper.sendGetMethod({
      url: url,
      headers: {
        Authorization: userTokenHelper.getToken(),
      },
    });
  },

  deleteUser(userId: string): Cypress.Chainable<Cypress.Response<any>> {
    const url: string =
      apiHelper.getApiUrl() + userEndpoint.DELETE_USER_ENDPOINT(userId);
    return requestHelper.sendDeleteMethod({
      url: url,
    });
  },
};
