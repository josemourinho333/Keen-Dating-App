context('Change preference to se matches', () => {
  
  beforeEach(() => {
    cy.request('POST','/api/hardreset').wait(300)
    cy.visit("/")
    const login = 'ce@gmail.com'
    const password = '123'
  
    cy.get('input[placeholder="Username/Email"]').type(`${login}{enter}`);
    cy.get('input[placeholder="Password"]').type(`${password}{enter}`).wait(500)
  })

 

  it("can change gender preferences", () => {

    cy.visit("/preferences")
    .contains('Dating Preferences')
    cy.get('div').contains('I want to meet...').click().wait(300)
    cy.get('div').contains('I want to meet...').should('be.visible')
    cy.get('div').contains('Woman').should('be.visible')
    cy.get('div').contains('Man').should('be.visible')
   
    cy.get('input[type="radio"]').check('3').wait(300);
    cy.contains("Everyone").should('be.visible');
    })

     it("can change drink options", () => {

    cy.visit("/preferences")
    .contains('Dating Preferences')
    
    cy.get('div').contains('Someone who drinks...').click().wait(300)
    cy.get('div').contains( 'Socially').should('be.visible')
    cy.get('div').contains( 'Yes').should('be.visible')
    cy.get('input[type="radio"]').check('1').wait(300);
    cy.get('div').contains('Someone who drinks...').should('be.visible')
    cy.get('div').contains('Sometimes').should('be.visible')


})

     it("can change preferences for exercises", () => {

    cy.visit("/preferences")
    .contains('Dating Preferences')
    
    cy.get('div').contains('Someone who exercises...').click().wait(300)
    cy.get('div').contains( 'Never').should('be.visible')
    cy.get('div').contains( 'Often').should('be.visible')
    cy.get('input[type="radio"]').check('2').wait(300);
    cy.get('div').contains('Sometimes').should('be.visible')

})
     it("can change dating options", () => {

    cy.visit("/preferences")
    .contains('Dating Preferences')
    
    cy.get('div').contains('Looking for').click().wait(300)
    cy.get('div').contains( 'Long-term').should('be.visible')
    cy.get('div').contains( 'See where it goes').should('be.visible')
    cy.get('input[type="radio"]').check('1').wait(300);
    cy.get('div').contains("Looking for").should('be.visible');
    cy.get('div').contains("Not sure").should('be.visible');
    

})
     it("can change preferences and save it to see matches after", () => {

    cy.visit("/preferences")
    .contains('Dating Preferences')
    cy.get('div').contains('I want to meet...').click().wait(300)
    cy.get('div').contains('I want to meet...').should('be.visible')
    cy.get('div').contains('Woman').should('be.visible')
    cy.get('div').contains('Man').should('be.visible')
   
    cy.get('input[type="radio"]').check('3').wait(300);
    cy.contains("Everyone").should('be.visible');
    cy.get('div').contains('Someone who drinks...').click().wait(300)
    cy.get('div').contains( 'Socially').should('be.visible')
    cy.get('div').contains( 'Yes').should('be.visible')
    cy.get('input[type="radio"]').check('2').wait(300);
    cy.get('div').contains('Someone who exercises...').click().wait(300)
    cy.get('div').contains( 'Never').should('be.visible')
    cy.get('div').contains( 'Often').should('be.visible')
    cy.get('input[type="radio"]').check('2').wait(300);
    cy.get('div').contains('Looking for').click().wait(300)
    cy.get('div').contains( 'Long-term').should('be.visible')
    cy.get('div').contains( 'See where it goes').should('be.visible')
    cy.get('input[type="radio"]').check('1').wait(300);
    cy.get('div').contains("Everyone").should('be.visible');
    cy.get('div').contains("Not sure").should('be.visible');
    cy.get('a').contains('Save').click().wait(300)
    cy.get('div').contains('Check back later to see new people or update your preferences.').should('be.visible')

})



})
