/// <reference types='cypress' />

import moment from "moment";

const testUser = {
    firstName: "Santiago",
    surname: "Vásquez",
    username: "testUser",
    password: "verysecurepassword",
};
const { firstName, surname, username, password } = testUser;

let dbUser;

describe("full stack tests", () => {
    before(() => {
        // Check support/commands
        cy.clearLocalStorageSnapshot();
        cy.clearTestMessages("http://localhost:5000/api/message/testMessages");
        cy.clearTestUser("http://localhost:5000/api/user/testUser");
    });

    after(() => {
        cy.clearLocalStorageSnapshot();
        cy.clearTestMessages("http://localhost:5000/api/message/testMessages");
        cy.clearTestUser("http://localhost:5000/api/user/testUser");
    });

    it("should visit the login page", () => {
        cy.visit("/");
        cy.get("[role=login-form]").should("exist");
    });

    it("should visit the register page", () => {
        cy.get("[role=register-link]").click();
        cy.get("[role=register-form]").should("exist");
    });

    it("inputs should have expected names and types on register window", () => {
        cy.get("[role=register-form]")
            .children()
            .should("have.length", 6);
        cy.checkInput("firstName-register", "text", "firstName", /First Name/i);
        cy.checkInput("surname-register", "text", "surname", /surname/i);
        cy.checkInput("username-register", "text", "username", /username/i);
        cy.checkInput("password-register", "password", "password", /password/i);
        cy.checkFormButton("button-register");
        cy.checkLinkButton("login-link", "/");
    });

    it("should register user properly", () => {
        cy.intercept("POST", "http://localhost:5000/api/auth/register").as(
            "registerUser"
        );
        // Testing bad request
        cy.missingFieldsRegister().then((response) => {
            expect(response.body.res).to.equal("Missing fields!");
            expect(response.status).to.equal(400);
        });
        cy.typeRegisterForm(firstName, surname, username, "short");
        cy.get("[role=button-register]").click();
        cy.wait("@registerUser").then(({ response }) => {
            expect(response.body.res).to.equal(
                "Password must be at least 6 characters long!"
            );
            expect(response.statusCode).to.equal(400);
            cy.contains("Password must be at least 6 characters long!").should(
                "exist"
            );
        });
        cy.typeRegisterForm(firstName, surname, username, password);
        cy.get("[role=button-register]").click();
        cy.wait("@registerUser").then(({ response }) => {
            expect(response.body.res).to.equal("User registered successfully!");
            expect(response.statusCode).to.equal(201);
            cy.contains("User registered successfully!").should("exist");
        });
        cy.checkRegisterFormEmpty();
        cy.typeRegisterForm(firstName, surname, username, password);
        cy.get("[role=button-register]").click();
        cy.wait("@registerUser").then(({ response }) => {
            expect(response.body.res).to.equal("Username already taken!");
            expect(response.statusCode).to.equal(409);
            cy.contains("Username already taken!").should("exist");
        });
    });

    it("should go back to login window when clicking the go back button", () => {
        cy.get("[role=login-link]").click();
        cy.get("[role=login-form]").should("exist");
    });

    it("inputs should have expected names and types on login window", () => {
        cy.get("[role=login-form]")
            .children()
            .should("have.length", 4);
        cy.checkInput("username-login", "text", "username", /username/i);
        cy.checkInput("password-login", "password", "password", /password/i);
    });

    it("should login correctly", () => {
        cy.intercept("POST", "http://localhost:5000/api/auth/login").as(
            "loginUser"
        );
        cy.intercept("GET", "http://localhost:5000/api/user/getInfo").as(
            "userInfo"
        );
        cy.intercept("GET", "http://localhost:5000/api/message/getAll").as(
            "messages"
        );
        cy.typeLoginForm(username, "wrongpass");
        cy.get("[role=button-login]").click();
        cy.wait("@loginUser").then(({ response }) => {
            expect(response.body.res).to.equal("Invalid username or password!");
            expect(response.statusCode).to.equal(401);
            cy.contains("Invalid username or password!").should("exist");
        });
        cy.typeLoginForm("wronguser", password);
        cy.get("[role=button-login]").click();
        cy.wait("@loginUser").then(({ response }) => {
            expect(response.body.res).to.equal("Invalid username or password!");
            expect(response.statusCode).to.equal(401);
            cy.contains("Invalid username or password!").should("exist");
        });
        cy.typeLoginForm(username, password);
        cy.get("[role=button-login]").click();
        cy.wait("@loginUser").then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(localStorage.getItem("jwt")).to.equal(response.body.res);
            cy.saveLocalStorage();
        });

        cy.wait("@userInfo").then(({ response }) => {
            dbUser = response.body.res;
            expect(dbUser.firstName).to.equal(firstName);
            expect(dbUser.surname).to.equal(surname);
            expect(dbUser.username).to.equal(username);
            expect(response.statusCode).to.be.oneOf([200, 304]);
            cy.get("[role=username-div]").should(
                "contain",
                `Logged in as: ${username}`
            );
        });
        cy.wait("@messages").then(({ response }) => {
            expect(response.statusCode).to.be.oneOf([200, 304]);
        });
    });

    it("should send messages correctly", () => {
        cy.restoreLocalStorage();
        cy.intercept("POST", "http://localhost:5000/api/message/").as(
            "postMessage"
        );
        cy.get("[role=message-submit]").should("have.attr", "disabled");
        cy.typeMessage("Hello world!");
        cy.get("[role=message-submit]").should("not.have.attr", "disabled");
        cy.get("[role=message-submit]").click();
        cy.wait("@postMessage").then(({ response }) => {
            const { ownerId, text, createdAt } = response.body.res;
            expect(ownerId).to.equal(dbUser.id);
            expect(text).to.equal("Hello world!");
            cy.contains(
                moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")
            ).should("exist");
            cy.contains("Hello world!").should("exist");
            cy.get(".right").should("have.length", 1);
            expect(response.statusCode).to.equal(201);
        });
        cy.get("[role=message-submit]").should("have.attr", "disabled");
        cy.get("[role=message-input]").type("Hello world again!{enter}");
        cy.wait("@postMessage").then(({ response }) => {
            const { ownerId, text, createdAt } = response.body.res;
            expect(ownerId).to.equal(dbUser.id);
            expect(text).to.equal("Hello world again!");
            cy.contains(
                moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")
            ).should("exist");
            cy.contains("Hello world again!").should("exist");
            cy.get(".right").should("have.length", 2);
            expect(response.statusCode).to.equal(201);
        });
        cy.get("[role=message-submit]").should("have.attr", "disabled");
    });

    it("should logout correctly", () => {
        cy.restoreLocalStorage();
        cy.get("[role=logout-button]").should("contain", "Logout");
        cy.getLocalStorage("jwt").then((res) => {
            expect(res).to.exist;
        });
        cy.get("[role=logout-button]").click();
        cy.getLocalStorage("jwt").then((res) => {
            expect(res).to.be.null;
        });
        cy.get("[role=login-form]").should("exist");
    });
});
