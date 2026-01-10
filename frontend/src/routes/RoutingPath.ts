// frontend/src/routes/RoutingPath.ts

const RoutingPath = {
    // Public
    usersLogInView: "/log_in",
    signUpFormView: "/sign_up",

    // Protected
    homeView: "/",
    profileView: "/profile",
    settingsView: "/settings",
    createPostView: "/create_post",
} as const;

export default RoutingPath;
