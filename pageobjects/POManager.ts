import { LoginPage } from "./LoginPage";

export class POManager{

    loginPage : LoginPage;

    constructor(page){
        this.loginPage = new LoginPage(page);
    }
}