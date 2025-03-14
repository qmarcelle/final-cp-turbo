/// <reference types="cypress" />

/**
 * Example Cypress test using MSW
 * 
 * This demonstrates how to use MSW in Cypress component tests.
 * Note: For E2E tests, you would typically use Cypress's built-in
 * network interception capabilities (cy.intercept) instead.
 */

// MSW needs to be initialized before Cypress mounts the component
import { worker } from '../msw/browser';
import { http, HttpResponse } from 'msw';

describe('MSW with Cypress Component Testing Example', () => {
  beforeEach(() => {
    // Start MSW worker before each test
    worker.start();
    
    // Clear any custom handlers from previous tests
    worker.resetHandlers();
  });
  
  afterEach(() => {
    // Stop the worker after each test
    worker.stop();
  });
  
  it('demonstrates using MSW with a simple component', () => {
    // Add custom handlers for this test
    worker.use(
      http.get('https://api.example.com/user', () => {
        return HttpResponse.json({
          name: 'Test User',
          email: 'test@example.com'
        });
      })
    );
    
    // Create the component HTML
    const html = `
      <div class="user-profile">
        <button id="load-profile">Load Profile</button>
        <div id="profile-data" style="display:none">
          <h2 id="user-name"></h2>
          <p id="user-email"></p>
        </div>
      </div>
    `;
    
    // Mount the HTML
    cy.document().then((doc) => {
      const container = doc.createElement('div');
      container.innerHTML = html;
      doc.body.appendChild(container);
    });
    
    // Interact with the component
    cy.get('#load-profile').click();
    
    // Add fetch logic
    cy.window().then(win => {
      // Add a simple script that fetches data when button is clicked
      win.document.getElementById('load-profile')!.addEventListener('click', () => {
        fetch('https://api.example.com/user')
          .then(response => response.json())
          .then(data => {
            const profileData = win.document.getElementById('profile-data');
            if (profileData) profileData.style.display = 'block';
            
            const nameElement = win.document.getElementById('user-name');
            if (nameElement) nameElement.textContent = data.name;
            
            const emailElement = win.document.getElementById('user-email');
            if (emailElement) emailElement.textContent = data.email;
          });
      });
    });
    
    // Verify the data was displayed correctly
    cy.get('#profile-data').should('be.visible');
    cy.get('#user-name').should('have.text', 'Test User');
    cy.get('#user-email').should('have.text', 'test@example.com');
  });
  
  it('demonstrates handler override mid-test', () => {
    // Initial handler
    worker.use(
      http.get('https://api.example.com/data', () => {
        return HttpResponse.json({ initial: true });
      })
    );
    
    // Create the component HTML
    const html = `
      <div>
        <button id="load-initial">Load Initial</button>
        <button id="load-updated">Load Updated</button>
        <pre id="data-output"></pre>
      </div>
    `;
    
    // Mount the HTML
    cy.document().then((doc) => {
      const container = doc.createElement('div');
      container.innerHTML = html;
      doc.body.appendChild(container);
    });
    
    // Add behavior to buttons
    cy.window().then(win => {
      // First button fetches with initial handler
      win.document.getElementById('load-initial')!.addEventListener('click', () => {
        fetch('https://api.example.com/data')
          .then(response => response.json())
          .then(data => {
            const output = win.document.getElementById('data-output');
            if (output) output.textContent = JSON.stringify(data);
          });
      });
      
      // Second button fetches after we override the handler
      win.document.getElementById('load-updated')!.addEventListener('click', () => {
        fetch('https://api.example.com/data')
          .then(response => response.json())
          .then(data => {
            const output = win.document.getElementById('data-output');
            if (output) output.textContent = JSON.stringify(data);
          });
      });
    });
    
    // Click first button and verify initial data
    cy.get('#load-initial').click();
    cy.get('#data-output').should('contain', 'initial');
    
    // Override the handler
    cy.then(() => {
      worker.use(
        http.get('https://api.example.com/data', () => {
          return HttpResponse.json({ updated: true });
        })
      );
    });
    
    // Click second button and verify updated data
    cy.get('#load-updated').click();
    cy.get('#data-output').should('contain', 'updated');
  });
}); 