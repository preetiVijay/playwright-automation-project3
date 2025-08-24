import { Page, Locator } from "@playwright/test";

export class SignUpPage {
    page: Page;
    formTitle: Locator;
    title: Locator;
    password: Locator;
    day: Locator;
    months: Locator;
    years: Locator;
    newsLetter: Locator;
    optin: Locator;
    firstName: Locator;
    lastName: Locator;
    company: Locator;
    address: Locator;
    state: Locator;
    city: Locator;
    zipCode: Locator;
    mobileNumber: Locator;
    createAccountbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formTitle = page.locator(".login-form h2 b").first();
        this.title = page.locator("#id_gender2");
        this.password = page.locator("#password");
        this.day = page.locator("select[id=days]");
        this.months = page.locator("select[id=months]");
        this.years = page.locator("select[id=years]");
        this.newsLetter = page.locator("#newsletter");
        this.optin = page.locator("#optin");
        this.firstName = page.locator("#first_name");
        this.lastName = page.locator("#last_name");
        this.company = page.locator("#company");
        this.address = page.locator("#address1");
        this.state = page.locator("#state");
        this.city = page.locator("#city");
        this.zipCode = page.locator("#zipcode");
        this.mobileNumber = page.locator("#mobile_number");
        this.createAccountbutton = page.locator("button[type='submit']").first();
    }

    getFormTitle(): Locator {
        return this.formTitle;
    }

    async createAccount(password: string, firstName: string, lastName: string) {       
        await this.title.click();
        await this.password.fill(password);
        await this.day.selectOption({ value: "12" });
        await this.months.selectOption({ value: "2" });
        await this.years.selectOption({ value: "2000" });
        await this.newsLetter.click();
        await this.optin.click();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.company.fill("XYZ");
        await this.address.fill("123 Asha Nagar");
        await this.state.fill("Uttar Pradesh");
        await this.city.fill("Lucknow");
        await this.zipCode.fill("780342");
        await this.mobileNumber.fill("9213212341");
        await this.createAccountbutton.click();
    }

}