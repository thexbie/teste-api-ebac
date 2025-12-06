/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then((response) => {
      return contrato.validateAsync(response.body)
    })
  })

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  })

  it('Deve cadastrar um usuário com sucesso', () => {
    let usuario = 'Usuário Teste ' + Math.floor(Math.random() * 100000000)
    let email = 'usuario.teste' + Math.floor(Math.random() * 100000000) + '@teste.com.br'
    cy.cadastrarUsuario(usuario, email, 'senha123').then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  })

  it('Deve validar um usuário com email inválido', () => {
  // Não entendi o que seria 'validar' neste cenário, então implementei o teste para tentar cadastrar um usuário com email inválido
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Usuário Inválido",
        "email": "emailinvalido.com",
        "password": "senha123",
        "administrador": "true"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.email).to.equal('email deve ser um email válido')
    })
  })

  it('Deve editar um usuário previamente cadastrado', () => {
    let usuario = 'Usuário Teste Editado' + Math.floor(Math.random() * 100000000)
    let email = 'usuario.testeeditado' + Math.floor(Math.random() * 100000000) + '@teste.com.br'
    cy.cadastrarUsuario(usuario, email, 'senha123').then((response) => {
      expect(response.status).to.equal(201)
      let id = response.body._id
      cy.request({
        method: 'PUT',
        url: 'usuarios' + '/' + id,
        body: {
          "nome": "Edição Teste",
          "email": "usuario.editado" + Math.floor(Math.random() * 100000000) + "@teste.com.br",
          "password": "senha123",
          "administrador": "true"
        }
      }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Registro alterado com sucesso')
      })
    })
  })

  it.only('Deve deletar um usuário previamente cadastrado', () => {
    let usuario = 'Usuário Teste Editado' + Math.floor(Math.random() * 100000000)
    let email = 'usuario.testeeditado' + Math.floor(Math.random() * 100000000) + '@teste.com.br'
    cy.cadastrarUsuario(usuario, email, 'senha123').then((response) => {
      expect(response.status).to.equal(201)
      let id = response.body._id
    cy.request({
      method: 'DELETE',
      url: 'usuarios' + '/' + id,
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Registro excluído com sucesso')
    })
    })
  })
})