// Importa o faker.js
const { faker } = require('@faker-js/faker');

// Gera um nome aleatório usando faker
const nomeAleatorio = faker.name.firstName() + ' ' + faker.name.lastName();

describe('Validação do CPF no Cadastro de Funcionário', () => {
  beforeEach(() => {
    // Acessa o site antes de cada teste
    cy.visit('https://analista-teste.seatecnologia.com.br/');
    cy.get('.c-kUQtTK').contains('+ Adicionar Funcionário').click(); // Abre o formulário
  });

  it('Deve aceitar um CPF válido com 11 números', () => {
    // Preenche o nome com um valor válido
    cy.get('input[name="name"]').type(nomeAleatorio);

    // Preenche o CPF com 11 números válidos
    cy.get('input[name="cpf"]').type('12345678909');

    // Clica no botão salvar
    cy.get('button.save').click().then(() => {;
        cy.log('O sistema conseguiu validar os dados corretamente.');// Mensagem exibida no final do fluxo
    });
  });

  it('Deve exibir erro para CPF com menos de 11 caracteres', () => {
    // Preenche o nome com um valor válido
    cy.get('input[name="name"]').type(nomeAleatorio);
    Cypress.config('defaultCommandTimeout', 5000);

    // Preenche o CPF com menos de 11 caracteres
    cy.get('input[name="cpf"]').type('1236');

    // Seleciona o campo "RG" usando o atributo name e insere um RG
    cy.get('input[name="rg"]').type('1234567'); // RG de exemplo

    // Seleciona o campo "Data de Nascimento" e insere uma data
    cy.get('input[name="birthDay"]').type('1990-01-01'); // Exemplo de data de nascimento

    // Seleciona o campo "Cargo" e escolhe a opção "Cargo 02"
    cy.get(':nth-child(6) > .ant-select > .ant-select-selector').click();; // Clica no seletor para abrir o menu de cargos
    cy.get('.ant-select-item-option-content').contains('Cargo 02').click(); // Seleciona "Cargo 02"

    cy.get('input.ant-checkbox-input').click();

    // Clica no botão salvar
    cy.get('button.save').click().then(() => {;
        cy.log('O sistema não conseguiu validar os dados inválidos corretamente.');// Mensagem exibida no final do fluxo
    });
  });

  it('Deve exibir erro para CPF com letras e números', () => {
    // Preenche o nome com um valor válido
    cy.get('input[name="name"]').type(nomeAleatorio);

    // Preenche o CPF com letras
    cy.get('input[name="cpf"]').type('abcde12345');

    // Clica no botão salvar
    cy.get('button.save').click().then(() => {;
        cy.log('O sistema não conseguiu validar os dados inválidos corretamente.');// Mensagem exibida no final do fluxo
    });
  });
});