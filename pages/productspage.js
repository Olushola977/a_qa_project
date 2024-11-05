export const productsPage = (page) => {
    const productList = () => page.locator('[data-test="inventory-item-name"]');
    const productFilter = () => page.getByTestId("product-sort-container");

    return {
        productList,
        productFilter
    };
};