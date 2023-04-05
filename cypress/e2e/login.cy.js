
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'



describe('login', () => {

	context('quando submeto o formulário', () => {
		it('deve logar com sucesso', () => {
			const user = {
				name: 'Ciro',
				email: 'ciroveiga.braz@gmail.com',
				password: '@Pretaporter0'
			}

			loginPage.submit(user.email, user.password)
			shaversPage.header.userShouldBeLoggedIn(user.name)
		})

		it('não deve logar com senha incorreta', () => {
			const user = {
				name: 'Ciro',
				email: 'ciroveiga.braz@gmail.com',
				password: '123456'
			}

			loginPage.submit(user.email, user.password)

			const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

			cy.get('.notice-container')
				.should('be.visible')
				.find('.error p')
				.should('have.text', message)
		})

		it('não deve logar com email não cadastrado', () => {
			const user = {
				name: 'Ciro',
				email: 'ciroveiga@gmail.com',
				password: '123456'
			}

			loginPage.submit(user.email, user.password)

			const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

			cy.get('.notice-container')
				.should('be.visible')
				.find('.error p')
				.should('have.text', message)
		})

		it('campos obrigatórios', () => {
			loginPage.submit()
			loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')


		})
	})

	context('senha muito curta', () => {

		const passwords = [
			'1',
			'12',
			'123',
			'1234',
			'12345'
		]

		passwords.forEach((p) => {
			it(`não deve logar com a senha: ${p}`, () => {
				loginPage.submit('ciroveiga.braz@gmail.com', p)
				loginPage.alertShouldBe('Pelo menos 6 caracteres')

			})
		})
	})
	context('email no formato incorreto', () => {

		const emails = [
			'ciroveiga$gmail.com',
			'ciroveiga.com.br',
			'gmail.com',
			'@gmail.com.br',
			'veiga',
			'123456',
			'@yahoo',
			'@!@!@!$'
		]
		emails.forEach((e) => {

			it(`não deve logar com o email: ${e}`, () => {
				loginPage.submit(e, '@Pretaporter0')
				loginPage.alertShouldBe('Informe um email válido')
			})
		})
	})

})




