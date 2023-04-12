
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

import data from '../fixtures/users-login.json'

describe('login', () => {

	context('quando submeto o formulário', () => {
		it('deve logar com sucesso', () => {

			// Dado que eu tenho um NOVO usuário
			const user = data.success

			cy.task('removeUser', user.email)
				.then(function (result) {
					cy.log(result)

				})

			cy.request({
				method: 'POST',
				url: 'http://localhost:3333/users',
				body: user
			}).then(function (response) {
				expect(response.status).to.eq(201)
			})

			// Quando submeto o form de login com esse usuário
			loginPage.submit(user.email, user.password)


			//Então devo ser logado com sucesso
			shaversPage.header.userShouldBeLoggedIn(user.name)






		})

		it('não deve logar com senha incorreta', () => {
			const user = data.invpass

			loginPage.submit(user.email, user.password)

			const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
			loginPage.noticeShouldBe(message)
		})

		it('não deve logar com email não cadastrado', () => {
			const user = data.email404

			loginPage.submit(user.email, user.password)

			const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
			loginPage.noticeShouldBe(message)
		})

		it('campos obrigatórios', () => {
			loginPage.submit()
			loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
		})
	})

	context('senha muito curta', () => {
		data.shortpass.forEach((p) => {

			it(`não deve logar com a senha: ${p}`, () => {
				loginPage.submit('ciroveiga.braz@gmail.com', p)
				loginPage.alertShouldBe('Pelo menos 6 caracteres')
			})
		})
	})
	context('email no formato incorreto', () => {
		data.invemails.forEach((e) => {

			it(`não deve logar com o email: ${e}`, () => {
				loginPage.submit(e, '@Pretaporter0')
				loginPage.alertShouldBe('Informe um email válido')
			})
		})
	})

})




