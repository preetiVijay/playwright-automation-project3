import { expect, Locator, Page } from "@playwright/test";
import { logger } from "../utils/logger";

export class LoginPage{
    page: Page;
    loginUserEmail: Locator;
    loginPassword: Locator;
    loginButton: Locator;
    userName: Locator;
    emailAddress: Locator;
    submitButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.loginUserEmail = page.locator(".login-form [type='email']");
        this.loginPassword = page.locator(".login-form [type='password']");
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.userName = page.locator(".signup-form [type='text']");
        this.emailAddress = page.locator(".signup-form [type='email']");
        this.submitButton = page.getByRole("button", { name: "Signup" });
    }

    async signUp(name:string, emailAddress:string){
        logger.info("Signing up user with name: " + name + " and email: " + emailAddress);
        await this.userName.fill(name);
        await this.emailAddress.fill(emailAddress);
        await this.submitButton.click();
        logger.info("Sign up submitted");
    }

    async logIn(emailAddress:string, password:string){
        logger.info("Logging in user with email: " + emailAddress);
        await this.loginUserEmail.fill(emailAddress);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
        logger.info("Login submitted");
    }
}