// Importa o faker.js
const { faker } = require('@faker-js/faker');

// Gera um nome aleatório usando faker
const nomeAleatorio = faker.name.firstName() + ' ' + faker.name.lastName();

describe('Validação da Data de Nascimento no Cadastro de Funcionário', () => {
  beforeEach(() => {
    // Acessa o site antes de cada teste
    cy.visit('https://analista-teste.seatecnologia.com.br/');
    cy.get('.c-kUQtTK').contains('+ Adicionar Funcionário').click(); // Abre o formulário
  });

  it.only('Deve aceitar uma data de nascimento válida', () => {
    // Preenche o nome e CPF com valores válidos
    cy.get('input[name="name"]').type(nomeAleatorio);
    cy.get('input[name="cpf"]').type('12345678909');

    // Preenche uma data válida no formato DD/MM/AAAA
    cy.get('input[name="birthDay"]').invoke('val', '0001-01-01').trigger('change');;

     // Seleciona o campo "RG" usando o atributo name e insere um RG
     cy.get('input[name="rg"]').type('1234567'); // RG de exemplo

     cy.get('input.ant-checkbox-input').click();

     // Clica no botão salvar
     cy.get('button.save').click();


    // Mensagem exibida no final do fluxo
     cy.log('O sistema não conseguiu validar os dados inválidos corretamente.');


  });

  it('Deve exibir erro para uma data de nascimento com ano muito grande', () => {
    // Preenche o nome e CPF com valores válidos
    cy.get('input[name="name"]').type(nomeAleatorio);
    cy.get('input[name="cpf"]').type('12345678909');

    // Preenche uma data inválida com um ano irreal
    cy.get('input[name="birthDay"]').type('9999-01-01');

    // Seleciona o campo "RG" usando o atributo name e insere um RG
    cy.get('input[name="rg"]').type('1234567'); // RG de exemplo

    cy.get('input.ant-checkbox-input').click();

    // Clica no botão salvar
    cy.get('button.save').click();


    // Mensagem exibida no final do fluxo
    cy.log('O sistema não conseguiu validar os dados inválidos corretamente.');
  });

  it('Deve exibir erro para uma data de nascimento no futuro', () => {
    // Preenche o nome e CPF com valores válidos
    cy.get('input[name="name"]').type(nomeAleatorio);
    cy.get('input[name="cpf"]').type('12345678909');

    // Preenche uma data futura
    cy.get('input[name="birthDay"]').type('2025-06-25');

    // Seleciona o campo "RG" usando o atributo name e insere um RG
    cy.get('input[name="rg"]').type('1234567'); // RG de exemplo

    cy.get('input.ant-checkbox-input').click();

    // Clica no botão salvar
    cy.get('button.save').click();

    // Mensagem exibida no final do fluxo
    cy.log('O sistema não conseguiu validar os dados inválidos corretamente.');
  });
});