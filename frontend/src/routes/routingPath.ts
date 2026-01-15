// frontend/src/routes/routingPath.ts

const routingPath = {
    // Public
    usersLogInView: "/log_in",
    signUpFormView: "/sign_up",

    // Protected
    homeView: "/",
    profileView: "/profile",
    settingsView: "/settings",
    createPostView: "/create_post",
} as const;

export default routingPath;
