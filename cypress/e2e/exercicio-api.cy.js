import contrato from '../contracts/usuario.contract'
import { faker } from '@faker-js/faker'

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          const useremail = faker.internet.email()
          cy.NovoUsuario('Cavalcanti', useremail, 'teste', 'true').then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": "Cavalcanti",
                    "email": "beltrano@q.com.br",
                    "password": "teste",
                    "administrador": "true"
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          const useremail = faker.internet.email()
          const editeemail = faker.internet.email()
          cy.NovoUsuario('Cavalcanti', useremail, 'teste', 'true').then(response => {
               let id = response.body._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {
                         nome: 'Editado',
                         email: editeemail,
                         password: 'teste',
                         administrador: 'true'
                    }
               })
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal('Registro alterado com sucesso')
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          const useremail = faker.internet.email()
          cy.NovoUsuario('Deletado', useremail, 'teste', 'true').then(response => {
               let id = response.body._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`
               
               

     }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body.message).to.equal('Registro excluído com sucesso')
     })
     })
     
    });


});
