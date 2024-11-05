export const loginPage = (page) => {
    const usernameField = () => page.getByTestId("username");
    const passwordField = () => page.getByTestId("password");
    const loginButton = () => page.getByTestId("login-button");

    return {
        fillLoginFormAndSubmit: async (username, password) => {
            await usernameField().fill(username);
            await passwordField().fill(password);
            await loginButton().click();
        },
    };
};