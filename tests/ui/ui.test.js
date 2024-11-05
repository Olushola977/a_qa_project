const { test, expect } = require('@playwright/test');

// test.use({
//     baseURL: "https://www.saucedemo.com"
// });

test.describe("Items Sorting Test", () => {
    const userData = {
        username: "standard_user",
        password: "secret_sauce"
    };

    test('Verify items are sorted', async ({ page }) => {
        await page.goto("/");
        await page.getByTestId("username").fill(userData.username);
        await page.getByTestId("password").fill(userData.password);
        await page.getByTestId("login-button").click();

        // Wait for initial product list to load
        await page.waitForSelector('[data-test="inventory-item-name"]');

        // get initial list of products
        const productList = page.locator('[data-test="inventory-item-name"]');

        const productsCount = await productList.count();
        const productTitles = [];
        for (let i = 0; i < productsCount; i++) {
            const title = await productList.nth(i).textContent();
            if (title) productTitles.push(title.trim());
        }

        console.log('Initial Product Titles:', productTitles);

        // sort the titles alphabetically and compare
        const sortedProductTitles = [...productTitles].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
        expect(productTitles).toEqual(sortedProductTitles);

        // change sorting to inverse
        await page.getByTestId("product-sort-container").selectOption('za');

        // wait for the page to update to reflect the inverse sorting
        await page.waitForTimeout(1000);

        // get the new sorted list
        const inverseProductTitles = [];
        for (let i = 0; i < productsCount; i++) {
            const title = await productList.nth(i).textContent();
            if (title) inverseProductTitles.push(title.trim());
        }

        console.log('Inverse Product Titles:', inverseProductTitles);

        // sort inverse titles for comparison
        const sortedInverseProductTitles = [...inverseProductTitles].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: "base" }));
        expect(inverseProductTitles).toEqual(sortedInverseProductTitles);
    });
});
