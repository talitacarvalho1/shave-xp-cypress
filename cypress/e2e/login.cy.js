import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('when I submit the form', () => {

        it('should log in successfully', () => {
            const user = {
                name: 'talita',
                email: 'talita@mail.com',
                password: 'pwd123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('should not log in with an invalid password', () => {
            const user = {
                name: 'talita',
                email: 'talita@mail.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('should not log in with unregistered email', () => {
            const user = {
                name: 'talita',
                email: 'talita@404.com',
                password: '123456'
            }

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

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            it(`should not log in using the password: ${p}`, () => {
                loginPage.submit('talita@mail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('invalid emails', () => {
        const emails = [
            'name&gmail.com',
            'name.com',
            '@gmail.com',
            '@',
            'name@',
            '1132248',
            '@%&#^#*#',
            'xpto123'
        ]

        emails.forEach((e) => {
            it(`should not log in using the email: ${e}`, () => {
                loginPage.submit(e, 'pwd123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})