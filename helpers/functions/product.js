export const getProductTitles = async (productList, productsCount) => {
    const productTitles = [];
    for (let i = 0; i < productsCount; i++) {
        const title = await productList.nth(i).textContent();
        if (title) productTitles.push(title.trim());
    }
    return productTitles
}

export const sortProducts = async (productTitles, mode) => {
    if(mode == "inverse") {
        const sortedInverseProductTitles = [...productTitles].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: "base" }));
        return sortedInverseProductTitles
    } else {
        const sortedProductTitles = [...productTitles].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
        return sortedProductTitles
    }
}