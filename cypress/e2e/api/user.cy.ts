import { userService } from "../../utils/api/services/user-service";
import { STATUS_CODE } from "../../utils/constants/status-code";
import { MSG_API } from "../../utils/constants/message";
import { IAccount } from "cypress/utils/interfaces/IUser";

describe("User API Testing", (): void => {
  before((): void => {
    cy.setUserData();
  });

  beforeEach((): void => {
    const user: IAccount = Cypress.env("user");
    cy.wrap(user).as("user");
  });

  it("Should generate token", function (): void {
    userService
      .generateToken(this.user.username, this.user.password)
      .then((response: Cypress.Response<any>): void => {
        expect(response.status).to.eq(STATUS_CODE.RESPONSE_CODE_SUCCESSFUL_200);
        expect(response.body).to.have.property("token");
        expect(response.body.status).to.have.equal("Success");
        expect(response.body.result).to.have.equal(
          MSG_API.MESSAGE_GENERATE_TOKEN_SUCCESS
        );
      });
  });

  it("Shouldn't generate token with invalid username", function (): void {
    userService
      .generateToken(this.user.username + "invalid", this.user.password)
      .then((response: Cypress.Response<any>): void => {
        expect(response.status).to.eq(STATUS_CODE.RESPONSE_CODE_SUCCESSFUL_200);
        expect(response.body.status).to.have.equal("Failed");
        expect(response.body.result).to.have.equal(
          MSG_API.MESSAGE_GENERATE_TOKEN_FAIL
        );
      });
  });

  it("Shouldn't generate token with invalid password", function (): void {
    userService
      .generateToken(this.user.username, this.user.password + "invalid")
      .then((response: Cypress.Response<any>): void => {
        expect(response.status).to.eq(STATUS_CODE.RESPONSE_CODE_SUCCESSFUL_200);
        expect(response.body.status).to.have.equal("Failed");
        expect(response.body.result).to.have.equal(
          MSG_API.MESSAGE_GENERATE_TOKEN_FAIL
        );
      });
  });

  it("Should show an error message when missing username", function (): void {
    userService
      .generateToken("", this.user.password)
      .then((response: Cypress.Response<any>): void => {
        expect(response.status).to.eq(
          STATUS_CODE.RESPONSE_CODE_BAD_REQUEST_400
        );
        expect(response.body.message).to.have.equal(
          MSG_API.MESSAGE_GENERATE_TOKEN_MISSING_USERNAME_OR_PASSWORD
        );
      });
  });

  it("Should show an error message when missing password", function (): void {
    userService
      .generateToken(this.user.username, "")
      .then((response: Cypress.Response<any>): void => {
        expect(response.status).to.eq(
          STATUS_CODE.RESPONSE_CODE_BAD_REQUEST_400
        );
        expect(response.body.message).to.have.equal(
          MSG_API.MESSAGE_GENERATE_TOKEN_MISSING_USERNAME_OR_PASSWORD
        );
      });
  });

  it("Should show an error message when missing username and password", function (): void {
    userService
      .generateToken("", "")
      .then((response: Cypress.Response<any>): void => {
        expect(response.status).to.eq(
          STATUS_CODE.RESPONSE_CODE_BAD_REQUEST_400
        );
        expect(response.body.message).to.have.equal(
          MSG_API.MESSAGE_GENERATE_TOKEN_MISSING_USERNAME_OR_PASSWORD
        );
      });
  });
});
