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
    consentButton = page.getByRole("button", { name: "consent" });
    if (await consentButton.isVisible()) {
        await consentButton.click();
    }
});

test("Register User", async ({ page }) => {
    const firstName = "Priya";
    await page.getByRole("link", { name: "signup / login" }).click();
    await expect(page.getByRole("heading", { name: "new user signup!" })).toBeVisible();

    const userEmail = "priya." + Math.floor(Math.random() * 100000) + "@gmail.com";
    const loginPage = poManager.getLoginPage();
    await loginPage.signUp(firstName, userEmail);

    const signUpPage = poManager.getSignUpPage();
    await expect(signUpPage.getFormTitle()).toBeVisible();
    await signUpPage.createAccount("shsdgsgds@3442", firstName, "Shukla");

    await expect(page.getByRole("heading", { name: "account created!" })).toBeVisible();
    await page.getByRole("link", { name: "continue" }).click();

    await expect(page.getByText(`Logged in as ${firstName}`)).toBeVisible();

    // Delete account
    await page.getByRole("link", { name: "delete account" }).click();
    await expect(page.getByRole("heading", { name: "account deleted!" })).toBeVisible();

    await page.getByRole("link", { name: "continue" }).click();
});

test("Register User with existing email", async ({ page }) => {
    const firstName = "Preeti";

    await page.getByRole("link", { name: "signup / login" }).click();
    await expect(page.getByRole("heading", { name: "new user signup!" })).toBeVisible();

    const userEmail = "preetiV2412@gmail.com";
    const loginPage = poManager.getLoginPage();
    await loginPage.signUp(firstName, userEmail);

    const existingEmailError = page.locator(".signup-form p");
    await expect(existingEmailError).toHaveText("Email Address already exist!");
});