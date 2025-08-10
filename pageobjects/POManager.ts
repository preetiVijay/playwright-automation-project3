import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { SignUpPage } from "./SignUpPage";

export class POManager{

    loginPage : LoginPage;
    signUpPage: SignUpPage;

    constructor(page:Page){
        this.loginPage = new LoginPage(page);
        this.signUpPage = new SignUpPage(page);
    }

    getLoginPage():LoginPage{
        return this.loginPage;
    }  

    getSignUpPage():SignUpPage{
        return this.signUpPage;
    }
}