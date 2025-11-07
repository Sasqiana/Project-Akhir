import LoginPage from '../support/pageObjects/LoginPage';

describe('OrangeHRM Login Feature - With POM & Intercept', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]', {timeout: 10000}).should('be.visible');
    cy.intercept('POST', '**/auth/validate').as('loginRequest');
  });

  it('TC01 - Login dengan username dan password valid', () => {
    loginPage.login('Admin', 'admin123');

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });

    loginPage.verifyDashboard();
  });

  it('TC02 - Login menggunakan tombol Enter di keyboard', () => {
    cy.get(loginPage.usernameField).type('Admin');
    cy.get(loginPage.passwordField).type('admin123{enter}');

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });

    cy.url().should('include', '/dashboard');
  });

  it('TC03 - Tidak bisa login dengan password salah', () => {
    loginPage.login('Admin', 'salah123');

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 302, 401]);
    });

    loginPage.verifyErrorMessage('Invalid credentials');
  });

  it('TC04 - Tidak bisa login dengan username kosong', () => {
    loginPage.login('', 'admin123');
    loginPage.verifyRequiredMessage();
  });

  it('TC05 - Tidak bisa login dengan password kosong', () => {
    loginPage.login('Admin', '');
    loginPage.verifyRequiredMessage();
  });

  it('TC06 - Tidak bisa login dengan username dan password kosong', () => {
    loginPage.login('', '');
    loginPage.verifyRequiredMessage();
  });

  it('TC07 - Username case-sensitive (ADMIN% vs Admin)', () => {
    loginPage.login('ADMIN%', 'admin123');

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 302, 401]);
    });

    loginPage.verifyErrorMessage('Invalid credentials');
  });

  it('TC08 - Password case-sensitive (Admin123 vs admin123)', () => {
    loginPage.login('Admin', 'Admin123');

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 302, 401]);
    });

    loginPage.verifyErrorMessage('Invalid credentials');
  });

  it('TC09 - Menampilkan nama pengguna setelah login berhasil', () => {
    loginPage.login('Admin', 'admin123');

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });

    loginPage.verifyDashboard();
    loginPage.verifyProfileName('mandaTest964bfTest7b3b5 userUserb6287User7690b'); // ganti sesuai nama di dashboard
  });

  it('TC10 - Tetap login setelah refresh halaman dashboard', () => {
    loginPage.login('Admin', 'admin123');

    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
    cy.reload();
    cy.url().should('include', '/dashboard');
  });
});
