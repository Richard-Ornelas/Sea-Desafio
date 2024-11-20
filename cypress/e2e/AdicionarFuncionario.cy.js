// Importa o faker.js 
const { faker } = require('@faker-js/faker');
// Armazena um nome e sobrenome aleatórios gerados pela biblioteca faker na const nomeAleatotio
const nomeAleatorio = faker.name.firstName() + ' ' + faker.name.lastName();
const filePath = 'Teste.pdf';
// Acessa o site antes de cada teste
beforeEach(() => {
    cy.visit('https://analista-teste.seatecnologia.com.br/');
  });
  
  describe('Teste de Cadastro de Funcionário', () => {
    it('Deve adicionar um funcionário e preencher informações básicas', () => {
        // Clicar no botão "Adicionar Funcionário" usando a classe
        cy.get('.c-kUQtTK').contains('+ Adicionar Funcionário').click();
  
        // Seleciona o botão de estado (Inativo/Ativo) usando a tag e classe para maior especificidade
        cy.get('button.ant-switch').click(); // Alterna para o estado "Ativo"

        // Seleciona o campo "Nome" usando o atributo name, que é mais direto e específico
        cy.get('input[name="name"]').type(nomeAleatorio);

        // Seleciona o campo "CPF" usando o atributo name, pois é um campo específico de formulário
        cy.get('input[name="cpf"]').type('12345678901'); // CPF de exemplo

        // Seleciona o campo "RG" usando o atributo name, pelo mesmo motivo dos campos anteriores
        cy.get('input[name="rg"]').type('1234567'); // RG de exemplo

        // Seleciona o campo "Data de Nascimento" e insere uma data
        cy.get('input[name="birthDay"]').type('1990-01-01'); // Exemplo de data de nascimento

        // Seleciona o campo "Cargo" e escolhe a opção "Cargo 02"
        cy.get(':nth-child(6) > .ant-select > .ant-select-selector').click();; // Clica no seletor para abrir o menu de cargos
        cy.get('.ant-select-item-option-content').contains('Cargo 02').click(); // Seleciona "Cargo 02"

         // Seleciona o campo "Atividade" e escolhe a opção "Ativid 02"
        cy.get('.ant-select-selector').eq(1).click(); // Clica no segundo seletor para abrir o menu de atividades
        cy.get('.ant-select-item-option-content').contains('Ativid 02').click(); // Seleciona "Ativid 02"

        // Seleciona o campo "EPI" e escolhe a opção "Óculos de proteção"
        cy.get('.ant-select-selector').eq(2).click(); // Abre o menu de EPI
        cy.get('.ant-select-item-option-content').contains('Óculos de proteção').click(); // Seleciona "Óculos de proteção"

        // Preenche o campo "Número do CA" com o valor 9722
        cy.get('input[name="caNumber"]').type('9722');// Exemplo de data de nascimento

        // Upload do atestado médico
        cy.get('#file').attachFile(filePath); // Seleciona o campo de upload pelo ID associado ao label

        // Clica no botão com a classe 'save'
        cy.get('button.save').click();  
      });

        it('Deve Validar se o funcionário foi adicionado com sucesso', () => {

        // Recarrega a página para garantir o DOM atualizad
        cy.reload(); 

        // Verifica se o contêiner contém o nome
        cy.get('.c-bXqUbA').should('contain.text', nomeAleatorio)
        .then(() => {
          cy.log('Funcionário adicionado com sucesso'); // Adiciona mensagem no log
        });

    });
  });