import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

import data from '../fixtures/users-login.json'

describe('login', () => {



    context('when I submit the form', () => {

        it('should log in successfully', () => {
            const user = data.success

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('should not log in with an invalid password', () => {
            const user = data.invalidpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('should not log in with unregistered email', () => {
            const user = data.unregisteredemail

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })

        it('mandatory fields', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')            
        })
    })

    context('short passwords', () => {
        data.shortpass.forEach((p) => {
            it(`should not log in using the password: ${p}`, () => {
                loginPage.submit('talita@mail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('invalid emails', () => {
        data.invalidemails.forEach((e) => {
            it(`should not log in using the email: ${e}`, () => {
                loginPage.submit(e, 'pwd123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})