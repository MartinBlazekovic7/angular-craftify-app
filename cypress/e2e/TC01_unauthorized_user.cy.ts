describe('Neulogirani korisnik', () => {
  before(() => {
    cy.visit('http://localhost:4200/');
  });
  it('Neulogirani posjeti stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/');
  });
  it('Dolazi do Discover dijela', () => {
    cy.get('.homePage__Discover > h1').should('be.visible');
  });
  it('Gleda projekte', () => {
    cy.get('.p-carousel-next').click();
    cy.get('.p-carousel-next').click();
    cy.get('.p-carousel-next').click();
    cy.get('.p-carousel-next').click();
  });
  it('Pretražuje projekte po imenu', () => {
    cy.get('.ng-untouched').type('Diy');
    cy.get('.projectSearch__Toolbar > button').click({ force: true });
  });

  it('Ulazi u projekt', () => {
    cy.get(':nth-child(1) > .projectSearch__ItemContent > a').click();
  });
  it('Preusmjeren na stranicu projekta', () => {
    cy.url().should('include', 'http://localhost:4200/project/1');
  });
  it('Provjera elemenata', () => {
    cy.get('.projectPage__Header > img').should('be.visible');
    cy.get('h1').should('be.visible');
    cy.get('.projectPage__Header > img').should('be.visible');
    cy.get('.projectPage__Header > img').should('be.visible');
  });

  it('Otvaranje menija i prijelaz na Tutorials stranicu', () => {
    cy.get('.navigationBar__MenuButton > button > .pi').click();
    cy.get('[ng-reflect-router-link="tutorials"]').click();
  });
  it('Preusmjeren na stranicu Tutorials', () => {
    cy.url().should('include', 'http://localhost:4200/tutorials');
  });
  it('Provjera elemenata stranice Tutorials', () => {
    cy.get('.tutorials__ToolbarTitle > h2').should('be.visible');
    cy.get('.tutorials__ToolbarTitle > h2').should('be.visible');
  });
  it('Odabit jednog Tutorial elementa', () => {
    cy.get(':nth-child(1) > .tutorials__ItemContent > a').click();
  });
  it('Preusmjeren na stranicu jednog Tutorial elementa', () => {
    cy.url().should('include', 'http://localhost:4200/tutorial/1');
  });
  it('Provjera elemenata stranice pojedinog Tutoriala', () => {
    cy.get('.tutorialDetailPage__Header > i').should('be.visible');
    cy.get('h1').should('be.visible');
    cy.get('.tutorialDetailPage__Header > img').should('be.visible');
  });

  it('Pokušaj otvaranja Favoriti stranice', () => {
    cy.visit('http://localhost:4200/favorites');
  });
  it('Preusmjeren na naslovnu stranice zbog zabrane', () => {
    cy.url().should('include', 'http://localhost:4200');
  });

  it('Pokušaj otvaranja Profil stranice', () => {
    cy.visit('http://localhost:4200/profile');
  });
  it('Preusmjeren na naslovnu stranice zbog zabrane', () => {
    cy.url().should('include', 'http://localhost:4200');
  });

  it('Otvor menija s desne strane i prijelaz na stranicu Registracije', () => {
    cy.get('.ng-star-inserted > .pi').click();
    cy.get('[ng-reflect-router-link="registration"]').click();
  });
});

describe('Registracija novog korisnika', () => {
  it('Upisivanje podataka u formu', () => {
    cy.get('[formcontrolname="name"]').type('Luka Modrić');
    cy.get('[formcontrolname="username"]').type('lukam10');
    cy.get('[formcontrolname="email"]').type('lukamodric@gmail.com');
    cy.get('[formcontrolname="password"]').type('newPassword123');
  });

  it('Pritisak na SUBMIT gumb', () => {
    cy.get('.ng-invalid.ng-dirty > button').click();
  });

  it('Provjera da se dobila greška da je polje obavezno', () => {
    cy.get('.form__Error').should('be.visible');
    cy.get('[formcontrolname="confirmPassword"]').type('newPassword1233');
    cy.get('.ng-submitted > button').click();
  });

  it('Provjera da se dobila greška da se lozinke moraju podudarati', () => {
    cy.get('.form__Error').should('be.visible');
    cy.get('[formcontrolname="confirmPassword"]').clear();
    cy.get('[formcontrolname="confirmPassword"]').type('newPassword123');
  });

  it('Pritisak na SUBMIT gumb', () => {
    cy.get('.ng-submitted > button').click();
    cy.get('.successModal > .ng-star-inserted').click();
  });
});
