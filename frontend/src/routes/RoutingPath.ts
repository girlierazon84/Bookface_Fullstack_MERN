// frontend/src/routes/RoutingPath.ts

const RoutingPath = {
    wildCardView: "*",

    // Public
    usersLogInView: "/log_in",
    signUpFormView: "/sign_up",

    // Protected
    homeView: "/", // feed (after login)
    profileView: "/profile",
    settingsView: "/settings",
    createPostView: "/create_post",

    // Admin / misc
    adminView: "/admin_view",
    apiAliveView: "/my_api_is_alive",
    pageNotFoundView: "/404"
} as const;

export default RoutingPath;
