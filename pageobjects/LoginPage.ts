import { Locator, Page } from "@playwright/test";

export class LoginPage{
    page: Page;
    userEmail: Locator;

    constructor(page:Page){
        this.page = page;
        this.userEmail = page.locator("")
    }
}