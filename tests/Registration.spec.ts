import { test, expect, Locator } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

let poManager: POManager;
let consentButton: Locator;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await page.goto("https://automationexercise.com", {
        waitUntil: "domcontentloaded",
        timeout: 15000
    });
    await expect(page).toHaveTitle("Automation Exercise");
    await page.waitForLoadState('networkidle');
    consentButton = page.locator(".fc-footer-buttons .fc-cta-consent");
    if (await consentButton.isVisible()) {
        await consentButton.click();
    }
});

test("Register User", async ({ page }) => {
    const firstName = "Priya";
    // await page.locator("a:has-text('Signup / Login')").click();
    await page.locator(".navbar-nav li:nth-child(4)").click();
    await expect(page.locator(".signup-form h2")).toHaveText("New User Signup!");

    const userEmail = "priya." + Math.floor(Math.random() * 100000) + "@gmail.com";
    const loginPage = poManager.getLoginPage();
    await loginPage.signUp(firstName, userEmail);

    const signUpPage = poManager.getSignUpPage();
    await expect(signUpPage.getFormTitle()).toHaveText("Enter Account Information");
    await signUpPage.createAccount("shsdgsgds@3442", firstName, "Shukla");

    const accountCreatedMsg = page.locator(".text-center b");
    await expect(accountCreatedMsg).toBeVisible();
    await expect(accountCreatedMsg).toHaveText("Account Created!");
    await page.locator(".pull-right a.btn-primary").click();

    // Verify logged in
    const loggedInText = page.locator("li:has-text('Logged in as')");
    await loggedInText.waitFor({ state: "visible" });
    await expect(loggedInText).toContainText(`Logged in as ${firstName}`);

    // Delete account
    await page.locator(".navbar-nav li").nth(4).click();
    const accountDeletedMsg = page.locator(".text-center b");
    await expect(accountDeletedMsg).toHaveText("Account Deleted!");

    // Continue after deletion
    await page.locator(".pull-right a.btn-primary").click();
});

test("Register User with existing email", async ({ page }) => {
    const firstName = "Preeti";

    await page.locator(".navbar-nav li:nth-child(4)").click();
    await expect(page.locator(".signup-form h2")).toHaveText("New User Signup!");

    const userEmail = "preetiV2412@gmail.com";
    const loginPage = poManager.getLoginPage();
    await loginPage.signUp(firstName, userEmail);

    const existingEmailError = page.locator(".signup-form p");
    await expect(existingEmailError).toHaveText("Email Address already exist!");
});