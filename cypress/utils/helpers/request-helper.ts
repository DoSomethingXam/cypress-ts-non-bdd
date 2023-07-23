import userTokenHelper from "./user-token-helper";
import { IRequest } from "../interfaces/IRequest";

const requestHelper = {
  sendGetMethod(
    params: Partial<IRequest>
  ): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: "GET",
      url: params.url,
      headers: params.headers,
      failOnStatusCode: false,
    });
  },

  sendPostMethod(
    params: Partial<IRequest>
  ): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: "POST",
      url: params.url,
      body: params.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: userTokenHelper.getToken(),
        ...params.headers,
      },
      failOnStatusCode: false,
    });
  },

  sendPutMethod(
    params: Partial<IRequest>
  ): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: "PUT",
      url: params.url,
      body: params.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: userTokenHelper.getToken(),
        ...params.headers,
      },
      failOnStatusCode: false,
    });
  },

  sendDeleteMethod(
    params: Partial<IRequest>
  ): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: "DELETE",
      url: params.url,
      headers: {
        Authorization: userTokenHelper.getToken(),
        ...params.headers,
      },
      body: params.body,
      failOnStatusCode: false,
    });
  },
};

export default requestHelper;
