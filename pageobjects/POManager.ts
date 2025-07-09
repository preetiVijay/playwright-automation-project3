import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class POManager{

    loginPage : LoginPage;

    constructor(page:Page){
        this.loginPage = new LoginPage(page);
    }

    getLoginPage():LoginPage{
        return this.loginPage;
    }  
}