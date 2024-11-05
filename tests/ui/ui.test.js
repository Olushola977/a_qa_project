import { test, expect } from '@playwright/test';
import { userData } from '../../data/userData';
import { getProductTitles, sortProducts } from '../../helpers/functions/product';
import { loginPage } from '../../pages/loginpage';
import { productsPage } from '../../pages/productspage';

test.describe("Items Sorting Test", () => {

    test('Verify items are sorted', async ({ page }) => {
        // Go to website and Log in. 
        await page.goto("/");
        await loginPage(page).fillLoginFormAndSubmit(userData.username, userData.password)

        // wait for initial product list to load
        await productsPage(page).productList().waitFor()

        // get initial list of products
        const productList = productsPage(page).productList();

        const productTitles = await getProductTitles(productList, await productList.count());
        console.log('Initial Product Titles:', productTitles);

        // Verify that the items are sorted by Name ( A -> Z ).
        const sortedProductTitles = await sortProducts(productTitles)
        expect(productTitles).toEqual(sortedProductTitles);

        // Change the sorting to Name ( Z -> A). 
        await productsPage(page).productFilter().selectOption('za');

        // wait for the page to update to reflect the inverse sorting
        await page.waitForTimeout(1000);

        // get the new sorted list
        const inverseProductTitles = await getProductTitles(productList, await productList.count());
        console.log('Inverse Product Titles:', inverseProductTitles);

        // Verify that the items are sorted correctly.
        const sortedInverseProductTitles = await sortProducts(inverseProductTitles, "inverse");
        expect(inverseProductTitles).toEqual(sortedInverseProductTitles);
    });
});
