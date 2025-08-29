import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

let poManager: POManager;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await page.goto("https://automationexercise.com", {
        waitUntil: "domcontentloaded",
        timeout: 15000
    });
    await expect(page).toHaveTitle("Automation Exercise");
    await page.waitForLoadState('networkidle');
    const consentButton = page.getByRole("button", { name: "consent"});
    if (await consentButton.isVisible()) {
        await consentButton.click();
    }
});

test("Login User with correct email and password", async({page})=>{
    await page.getByRole("link", { name: "signup / login" }).click();
    await expect(page.getByRole("heading", { name: "login to your account" })).toBeVisible();

    const loginPage = poManager.getLoginPage();
    await loginPage.logIn("preetiV2412@gmail.com", "Qazwsx@0987");
    await expect(page.getByText("Logged in as Preeti")).toBeVisible();
});

test("Login User with incorrect email and password", async({page})=>{
    await page.getByRole("link", { name: "signup / login" }).click();
    await expect(page.getByRole("heading", { name: "login to your account" })).toBeVisible();

    const loginPage = poManager.getLoginPage();
    await loginPage.logIn("preetiV2413@gmail.com", "Qazwsx@0987");

    await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
});

test("Logout user", async({page})=>{
    await page.getByRole("link", { name: "signup / login" }).click();
    await expect(page.getByRole("heading", { name: "login to your account" })).toBeVisible();

    const loginPage = poManager.getLoginPage();
    await loginPage.logIn("preetiV2412@gmail.com", "Qazwsx@0987");
    await expect(page.getByText("Logged in as Preeti")).toBeVisible();

    // Logout account
    await page.getByRole("link", { name: "logout" }).click();
    await expect(page).toHaveTitle("Automation Exercise - Signup / Login");
});