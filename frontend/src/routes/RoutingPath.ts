// frontend/src/routes/RoutingPath.ts

const RoutingPath = {
    wildCardView: "*",
    usersLogInView: "/log_in",
    signUpFormView: "/sign_up",
    profileView: "/profile",
    settingsView: "/settings",
    createPostView: "/create_post",
    homeView: "/",
    adminView: "/admin_view",
    apiAliveView: "/my_api_is_alive",
    pageNotFoundView: "/404"
} as const;

export default RoutingPath;
