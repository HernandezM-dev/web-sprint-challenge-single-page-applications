describe('test input, test mulitple toppings are selectable, test submit button', ()=>{

    it('test name field is usable', ()=>{
        cy.visit('http://localhost:3000/')
        cy.get('.home-container > a').click()
        cy.get('input[name=name]').type('testname')
    })
    it('test multiple toppings', () =>{
        cy.get('input[type=checkbox]')
        .check()
    })
    it('can it submit', () =>{
        cy.get('input[type=radio]').check()
        cy.get('select').select('Small')
        cy.get('.form-inputs > button').click()
    })
})