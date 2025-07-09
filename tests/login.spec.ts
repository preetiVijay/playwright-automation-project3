import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

test("Login User with correct email and password", async({page})=>{
    const poManager = new POManager(page);
    await page.goto("http://automationexercise.com");
    expect(await page.title()).toContain("Automation Exercise");
    await page.pause();
    await page.locator(".fc-footer-buttons .fc-cta-consent").click();
    await page.locator(".navbar-nav li:nth-child(4)").click();
    const loginPage = poManager.getLoginPage();
    await loginPage.signUp("Preeti","preeti.241293@gmail.com");
});