import { URL_CONST } from "../../utils/constants/url";
class NavigatorPage {
  goToLoginPage(): void {
    cy.visit(URL_CONST.LOGIN_URL);
  }

  goToBookStorePage(): void {
    cy.visit(URL_CONST.BOOKS_URL);
  }

  goToBookDetailPage(isbn: string): void {
    cy.visit(URL_CONST.BOOK_DETAIL_URL(isbn));
  }

  goToProfilePage(): void {
    cy.visit(URL_CONST.PROFILE_URL);
  }
}

export default NavigatorPage;
