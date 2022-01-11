import "cypress-localstorage-commands";

const COMMAND_DELAY = 500;

for (const command of [
    "visit",
    "click",
    "trigger",
    "type",
    "clear",
    "reload",
    "contains",
]) {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
        const origVal = originalFn(...args);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(origVal);
            }, COMMAND_DELAY);
        });
    });
}

Cypress.Commands.add("clearTestUser", (url) => {
    cy.request({
        method: "DELETE",
        url,
        failOnStatusCode: false,
    });
});

Cypress.Commands.add("clearTestMessages", (url) => {
    cy.request({
        method: "DELETE",
        url,
        failOnStatusCode: false,
    });
});

Cypress.Commands.add("checkInput", (role, type, name, placeholder) => {
    cy.get(`[role=${role}]`)
        .should("be.visible")
        .should("have.attr", "placeholder")
        .should("match", placeholder);
    cy.get(`[role=${role}]`)
        .should("have.attr", "name")
        .should("equal", name);
    cy.get(`[role=${role}]`)
        .should("have.attr", "type")
        .should("equal", type);
    cy.get(`[role=${role}]`).should("have.attr", "required");
});

Cypress.Commands.add("checkFormButton", (role) => {
    cy.get(`[role=${role}]`)
        .should("be.visible")
        .should("have.attr", "type")
        .should("equal", "submit");
});

Cypress.Commands.add("checkLinkButton", (role, href) => {
    cy.get(`[role=${role}]`)
        .should("be.visible")
        .should("have.attr", "href")
        .should("equal", href);
});

Cypress.Commands.add("missingFieldsRegister", () => {
    cy.request({
        method: "POST",
        url: "http://localhost:5000/api/auth/register",
        failOnStatusCode: false,
        body: {
            firstName: "",
            surname: "",
            username: "",
            password: "",
        },
    });
});

Cypress.Commands.add(
    "typeRegisterForm",
    (firstName, surname, username, password) => {
        cy.get("[role=firstName-register]")
            .clear()
            .type(firstName)
            .should("have.value", firstName);
        cy.get("[role=surname-register]")
            .clear()
            .type(surname)
            .should("have.value", surname);
        cy.get("[role=username-register]")
            .clear()
            .type(username)
            .should("have.value", username);
        cy.get("[role=password-register]")
            .clear()
            .type(password)
            .should("have.value", password);
    }
);

Cypress.Commands.add("checkRegisterFormEmpty", () => {
    cy.get("[role=firstName-register]").should("have.value", "");
    cy.get("[role=surname-register]").should("have.value", "");
    cy.get("[role=username-register]").should("have.value", "");
    cy.get("[role=password-register]").should("have.value", "");
});

Cypress.Commands.add("typeLoginForm", (username, password) => {
    cy.get("[role=username-login]")
        .clear()
        .type(username)
        .should("have.value", username);
    cy.get("[role=password-login]")
        .clear()
        .type(password)
        .should("have.value", password);
});

Cypress.Commands.add("typeMessage", (message, password) => {
    cy.get("[role=message-input]")
        .clear()
        .type(message)
        .should("have.value", message);
});

Cypress.Commands.add("simulateResponse", () => {});
