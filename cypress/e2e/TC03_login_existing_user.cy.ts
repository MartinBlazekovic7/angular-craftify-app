describe('Prijava', () => {
  before(() => {
    cy.visit('http://localhost:4200/login');
  });
  it('Korisnik posjeti stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/login');
  });
  it('Korisnik unosi podatke', () => {
    cy.get('[type="text"]').type('john@example.com');
    cy.get('[type="password"]').type('newPassword123');
  });
  it('Korisnik pritišće SUBMIT gumb', () => {
    cy.get('form.ng-dirty > button').click({ force: true });
    cy.get('.successModal > .ng-star-inserted').click();
  });
  it('Provjeriti da li je korisnik prebačen na HOME stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/');
  });
  it('Provjeriti da li se učitala navigacijska traka', () => {
    cy.get('.navigation__Bar').should('be.visible');
  });
  it('Provjeriti da li se učitao meni', () => {
    cy.get('.ng-star-inserted > .pi').click();
    cy.get('[ng-reflect-router-link="profile"]').should('be.visible');
  });
});
