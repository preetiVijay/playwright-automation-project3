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

test("Place Order: Register before Checkout", async ({ page }) => {
    const firstName = "Priya";

    // Navigate to Signup/Login
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
    await page.pause();

    // Continue after account creation
    const continueButton = page.locator(".pull-right a.btn-primary");
    await expect(continueButton).toBeVisible({ timeout: 10000 }); // Wait up to 10s for visibility
    await continueButton.click();

    // Verify logged in
    const loggedInText = page.locator("li:has-text('Logged in as')");
    await loggedInText.waitFor({ state: "visible" });
    await expect(loggedInText).toContainText(`Logged in as ${firstName}`);

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
    await page.locator("input[name='name_on_card']").fill("Priya Shukla");
    await page.locator("input[name='card_number']").fill("1234567890123456");
    await page.locator("input[name='cvc']").fill("123");
    await page.locator("input[name='expiry_month']").fill("12");
    await page.locator("input[name='expiry_year']").fill("2025");
    await page.locator("#submit").click();
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