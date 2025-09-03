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
    const consentButton = page.getByRole("button", { name: "consent" });
    if (await consentButton.isVisible()) {
        await consentButton.click();
    }
});

test("Place Order: Register before Checkout", async ({ page }) => {
   const firstName = "Priya";

    // Navigate to Signup/Login
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

    // Add product to cart
    const productsList = page.locator(".productinfo");
    const productCount = await productsList.count();
    // Add product to cart
    for (let i = 0; i < productCount; i++) {
        const productName = await productsList.nth(i).locator('p').textContent();
        if (productName && productName.includes("Winter Top")) {
            await productsList.nth(i).locator("a.add-to-cart").click();
            break;
        }
    }

    await page.locator('.close-modal').click();

    // Click on Cart button
    await page.locator(".shop-menu li:nth-child(3)").click();
    // Verify that cart page is displayed
    await expect(page).toHaveTitle("Automation Exercise - Checkout");
    // Click Proceed To Checkout
    await page.locator(".check_out").click();
    // Click on Place Order
    await page.locator(".container .check_out").click();
    // Fill payment details
    const paymentPage = poManager.getPaymentPage();
    await paymentPage.enterPaymentDetails("Priya Shukla", "1234567890123456", "123", "12", "2025");
    await paymentPage.confirmOrder();
    
    // Verify order confirmation
    await expect(page).toHaveTitle("Automation Exercise - Order Placed");
    const orderPlacedHeading = page.locator(".col-sm-offset-1 h2").first();
    await expect(orderPlacedHeading).toBeVisible({ timeout: 10000 }); // Wait up to 10s for visibility
    expect(await orderPlacedHeading.textContent()).toContain("Order Placed!");

    const orderPlacedMsg = page.locator(".col-sm-offset-1 p").first();
    await expect(orderPlacedMsg).toBeVisible({ timeout: 10000 });
    expect(await orderPlacedMsg.textContent()).toContain("Congratulations! Your order has been confirmed!");
    
    // Delete account
    await page.locator(".navbar-nav li").nth(4).click();
    const accountDeletedMsg = page.locator(".text-center b");
    await expect(accountDeletedMsg).toHaveText("Account Deleted!");

    // Continue after deletion
    await page.locator(".pull-right a.btn-primary").click();
}); 

test.afterEach(async({page})=>{
    await page.close();
});