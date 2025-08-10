import { test, expect } from '@playwright/test';
import { POManager } from "../pageobjects/POManager";

test("Register User", async({page})=> {
    const poManager = new POManager(page);
    const firstName = "Priya";

    await page.goto("http://automationexercise.com");
    await page.pause();

    await expect(page).toHaveTitle("Automation Exercise");

    const consentButton = page.locator(".fc-footer-buttons .fc-cta-consent");
    if (await consentButton.isVisible()) {
        await consentButton.click();
    }
    await page.locator(".navbar-nav li:nth-child(4)").click();
    await expect(page.locator(".signup-form h2")).toHaveText("New User Signup!");

    const loginPage = poManager.getLoginPage();
    const signUpPage = poManager.getSignUpPage();
    await loginPage.signUp(firstName,"preeti.241293@gmail.com");

    await expect(signUpPage.getFormTitle()).toHaveText("Enter Account Information");
    await signUpPage.createAccount("shsdgsgds@3442", firstName, "Shukla");

    await expect(page.locator(".text-center b")).toBeVisible();
    await expect(page.locator(".text-center b")).toHaveText("Account Created!");

    await page.locator(".pull-right a.btn-primary").click();
    // await expect(page.locator(".navbar-nav li").nth(9)).toHaveText("Logged in as "+firstName);
    expect(await page.locator(".navbar-nav li").nth(10).textContent()).toContain(" Logged in as "+firstName);
    
    await page.locator(".navbar-nav li").nth(4).click();
    await expect(page.locator(".text-center b")).toHaveText("Account Deleted!");
    
    await page.locator(".pull-right a.btn-primary").click();
})