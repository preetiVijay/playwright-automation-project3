import { Page, Locator } from "@playwright/test";
import { logger } from "../utils/logger";

export class PaymentPage {
    page: Page;
    nameOnCard: Locator;
    cardNumber: Locator;
    cvc: Locator;
    expirationMonth: Locator;
    expirationYear: Locator;
    payAndConfirmOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameOnCard = page.locator("input[name='name_on_card']");
        this.cardNumber = page.locator("input[name='card_number']");
        this.cvc = page.locator("input[name='cvc']");
        this.expirationMonth = page.locator("input[name='expiry_month']");
        this.expirationYear = page.locator("input[name='expiry_year']");
        this.payAndConfirmOrderButton = page.getByRole("button", { name: "pay and confirm order" });
    }

    async enterPaymentDetails(nameOnCard: string, cardNumber: string, cvc: string, expirationMonth: string, expirationYear: string) {
        logger.info("Entering payment details");
        await this.nameOnCard.fill(nameOnCard);
        await this.cardNumber.fill(cardNumber);
        await this.cvc.fill(cvc);
        await this.expirationMonth.fill(expirationMonth);
        await this.expirationYear.fill(expirationYear);
        logger.info("Payment details entered");
    }

    async confirmOrder() {
        logger.info("Confirming order")
        await this.payAndConfirmOrderButton.click();
        logger.info("Order confirmed");
    }

}