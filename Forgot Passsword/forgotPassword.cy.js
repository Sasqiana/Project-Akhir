import ForgotPasswordPage from '../support/pageObjects/ForgotPasswordPage.js'

describe('OrangeHRM - Forgot Password Feature', () => {
  const forgotPage = new ForgotPasswordPage()

  beforeEach(() => {
    forgotPage.visit()
    forgotPage.clickForgotPassword()
  })

  it('TC01 - Verifikasi halaman Forgot Password terbuka', () => {
    forgotPage.verifyPageOpened()
  })

  it('TC02 - Verifikasi judul halaman sudah benar', () => {
  forgotPage.verifyPageTitle('Reset Password');
});

  it('TC03 - Verifikasi Reset Password dengan username kosong', () => {
    forgotPage.resetPassword('')
    forgotPage.verifyErrorMessage('Required')
  })

  it('TC04 - Verifikasi tombol Batal mengarahkan kembali ke halaman Login', () => {
    cy.get(forgotPage.cancelButton).click()
    forgotPage.verifyRedirectToLogin()
  })

  it('TC05 - Verifikasi pengguna dapat menavigasi kembali secara manual dan melihat formulir login', () => {
    cy.go('back')
    cy.get(forgotPage.forgotPasswordLink).should('be.visible')
  })
})
