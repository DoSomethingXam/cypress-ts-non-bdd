import { userService } from "../api/services/user-service";

const userTokenHelper = {
  setToken(): void {
    cy.fixture("user").then((user): void => {
      userService
        .generateToken(user.username, user.password)
        .then((res: Cypress.Response<any>): void => {
          Cypress.env("token", res.body.token);
        });
    });
  },

  getToken(): string {
    return `Bearer ${Cypress.env("token")}`;
  },
};

export default userTokenHelper;
