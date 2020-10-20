/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://pinamar-pide.web.app/#/')
    })
  
    // https://on.cypress.io/interacting-with-element
  
    it('.click() - click on a DOM element', () => {
      // https://on.cypress.io/click
      cy.get('[href="#/comida"]').click()
      cy.get(':nth-child(1) > .container-list-item').click();
      cy.get('.back').click()
      cy.get('[href="#/helado"]').click()
      cy.get('.search-input').type('Fre')
      cy.get('rect').click()
      // You can click on 9 specific positions of an element:
      //  -----------------------------------
      // | topLeft        top       topRight |
      // |                                   |
      // |                                   |
      // |                                   |
      // | left          center        right |
      // |                                   |
      // |                                   |
      // |                                   |
      // | bottomLeft   bottom   bottomRight |
      //  -----------------------------------
  
      // clicking in the center of the element is the default
      /* cy.get('#action-canvas').click()
  
      cy.get('#action-canvas').click('topLeft')
      cy.get('#action-canvas').click('top')
      cy.get('#action-canvas').click('topRight')
      cy.get('#action-canvas').click('left')
      cy.get('#action-canvas').click('right')
      cy.get('#action-canvas').click('bottomLeft')
      cy.get('#action-canvas').click('bottom')
      cy.get('#action-canvas').click('bottomRight') */
  
      // .click() accepts an x and y coordinate
      // that controls where the click occurs :)
  
      /* cy.get('#action-canvas')
        .click(80, 75) // click 80px on x coord and 75px on y coord
        .click(170, 75)
        .click(80, 165)
        .click(100, 185)
        .click(125, 190)
        .click(150, 185)
        .click(170, 165) */
    })
  })
  