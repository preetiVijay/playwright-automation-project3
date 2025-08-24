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
    const consentButton = page.locator(".fc-footer-buttons .fc-cta-consent");
    if (await consentButton.isVisible()) {
        await consentButton.click();
    }
});

test("Login User with correct email and password", async({page})=>{
    await page.locator(".navbar-nav li:nth-child(4)").click();
    await expect(page.locator(".login-form h2")).toHaveText("Login to your account");

    const loginPage = poManager.getLoginPage();
    await loginPage.logIn("preetiV2412@gmail.com","Qazwsx@0987");
    await page.locator(".navbar-nav li:nth-child(10)").waitFor({ state: "visible" });
    expect(await page.locator(".navbar-nav li:nth-child(10)").textContent()).toContain(" Logged in as Preeti");
});

test("Login User with incorrect email and password", async({page})=>{
    
    await page.locator(".navbar-nav li:nth-child(4)").click();
    await expect(page.locator(".login-form h2")).toHaveText("Login to your account");

    const loginPage = poManager.getLoginPage();
    await loginPage.logIn("preetiV2413@gmail.com","Qazwsx@0987");

    expect(await page.locator(".login-form p").textContent()).toContain("Your email or password is incorrect!");
});

test("Logout user", async({page})=>{
    
    await page.locator(".navbar-nav li:nth-child(4)").click();
    await expect(page.locator(".login-form h2")).toHaveText("Login to your account");

    const loginPage = poManager.getLoginPage();
    await loginPage.logIn("preetiV2412@gmail.com","Qazwsx@0987");
    await page.locator(".navbar-nav li:nth-child(10)").waitFor({ state: "visible" });
    expect(await page.locator(".navbar-nav li:nth-child(10)").textContent()).toContain(" Logged in as Preeti");

    // Logout account
    await page.locator(".navbar-nav li:nth-child(4)").waitFor({ state: "visible" });
    await page.locator(".navbar-nav li:nth-child(4)").click();
    await expect(page).toHaveTitle("Automation Exercise - Signup / Login");
});