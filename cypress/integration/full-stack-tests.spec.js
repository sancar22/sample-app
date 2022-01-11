/// <reference types='cypress' />

const { User } = require("../../server/models/user.ts");

describe("full stack tests", () => {
    // before(() => {
    //     User.destroy({ where: { username: "sancar22" } });
    // });

    // after(() => {
    //     User.destroy({ where: { username: "sancar22" } });
    // });

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
        cy.get("[role=firstName-register]")
            .should("be.visible")
            .should("have.attr", "placeholder")
            .should("match", /First Name/i);
        cy.get("[role=firstName-register]")
            .should("have.attr", "name")
            .should("eql", "firstName");
        cy.get("[role=firstName-register]")
            .should("have.attr", "type")
            .should("eql", "text");
        cy.get("[role=firstName-register]").should("have.attr", "required");

        cy.get("[role=surname-register]")
            .should("be.visible")
            .should("have.attr", "placeholder")
            .should("match", /surname/i);
        cy.get("[role=surname-register]")
            .should("have.attr", "name")
            .should("eql", "surname");
        cy.get("[role=surname-register]")
            .should("have.attr", "type")
            .should("eql", "text");
        cy.get("[role=surname-register]").should("have.attr", "required");

        cy.get("[role=username-register]")
            .should("be.visible")
            .should("have.attr", "placeholder")
            .should("match", /username/i);
        cy.get("[role=username-register]")
            .should("have.attr", "name")
            .should("eql", "username");
        cy.get("[role=username-register]")
            .should("have.attr", "type")
            .should("eql", "text");
        cy.get("[role=username-register]").should("have.attr", "required");

        cy.get("[role=password-register]")
            .should("be.visible")
            .should("have.attr", "placeholder")
            .should("match", /password/i);
        cy.get("[role=password-register]")
            .should("have.attr", "name")
            .should("eql", "password");
        cy.get("[role=password-register]")
            .should("have.attr", "type")
            .should("eql", "password");
        cy.get("[role=password-register]").should("have.attr", "required");

        cy.get("[role=button-register]")
            .should("be.visible")
            .should("have.attr", "type")
            .should("eql", "submit");

        cy.get("[role=login-link]")
            .should("be.visible")
            .should("have.attr", "href")
            .should("eql", "/");
    });

    it("should register user properly", () => {
        cy.intercept("POST", "http://localhost:5000/api/auth/register").as(
            "registerUser"
        );
        // Testing bad request
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
        }).then((response) => {
            expect(response.body.res).to.eq("Missing fields!");
            expect(response.status).to.eq(400);
        });

        cy.get("[role=firstName-register]")
            .type("Santiago")
            .should("have.value", "Santiago");
        cy.get("[role=surname-register]")
            .type("Vásquez")
            .should("have.value", "Vásquez");
        cy.get("[role=username-register]")
            .type("sancar22")
            .should("have.value", "sancar22");
        cy.get("[role=password-register]")
            .type("securepassword")
            .should("have.value", "securepassword");

        cy.get("[role=button-register]").click();
        cy.wait("@registerUser").then(({ response }) => {
            console.log(response);
        });
    });

    it("inputs should have expected names and types on login window", () => {
        cy.get("[role=login-form]")
            .children()
            .should("have.length", 4);
        cy.get("[role=username-login]")
            .should("be.visible")
            .should("have.attr", "placeholder")
            .should("match", /username/i);
        cy.get("[role=username-login]")
            .should("have.attr", "name")
            .should("eql", "username");
        cy.get("[role=username-login]")
            .should("have.attr", "type")
            .should("eql", "text");
        cy.get("[role=username-login]").should("have.attr", "required");
        cy.get("[role=password-login]")
            .should("be.visible")
            .should("have.attr", "placeholder")
            .should("match", /password/i);
        cy.get("[role=password-login]")
            .should("have.attr", "name")
            .should("eql", "password");
        cy.get("[role=password-login]")
            .should("have.attr", "type")
            .should("eql", "password");
        cy.get("[role=password-login]").should("have.attr", "required");
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
        cy.get("[role=username-login]")
            .type("camixLeon")
            .should("have.value", "camixLeon");
        cy.get("[role=password-login]")
            .type("helloworld")
            .should("have.value", "helloworld");
        cy.get("[role=button-login]").click();
        // await cause down will execute...?
        cy.wait("@loginUser").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(localStorage.getItem("jwt")).to.eq(response.body.res);
        });
        cy.wait("@userInfo").then(({ response }) => {
            expect(response.statusCode).to.be.oneOf([200, 304]);
            cy.get("[role=username-div]").should(
                "contain",
                "Logged in as: camixLeon"
            );
        });
        cy.wait("@messages").then(({ response }) => {
            expect(response.statusCode).to.be.oneOf([200, 304]);
        });
    });
});
