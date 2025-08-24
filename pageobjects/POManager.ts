import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { SignUpPage } from "./SignUpPage";
import { PaymentPage } from "./PaymentPage";

export class POManager{

    loginPage : LoginPage;
    signUpPage: SignUpPage;
    paymentPage: PaymentPage;

    constructor(page:Page){
        this.loginPage = new LoginPage(page);
        this.signUpPage = new SignUpPage(page);
        this.paymentPage = new PaymentPage(page);
    }

    getLoginPage():LoginPage{
        return this.loginPage;
    }  

    getSignUpPage():SignUpPage{
        return this.signUpPage;
    }

    getPaymentPage():PaymentPage{
        return this.paymentPage;
    }
}