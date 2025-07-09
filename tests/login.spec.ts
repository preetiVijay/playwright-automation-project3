import { test, expect } from "@playwright/test";


test("Login User with correct email and password", async({page})=>{
    await page.goto("http://automationexercise.com");
    expect(await page.title()).toContain("Automation Exercise");
})