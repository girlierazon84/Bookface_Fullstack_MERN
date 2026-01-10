// frontend/src/App.tsx

import styled from "styled-components";
import { matchPath, useLocation } from "react-router-dom";

import { Routing } from "./routes/Routing";
import FooterContainer from "./components/FooterContainer";
import NavigationBar from "./components/nav/NavigationBar";
import { UserProvider } from "./utils/global/provider/UserProvider";
import AuthBootstrap from "./utils/auth/AuthBootstrap";
import RoutingPath from "./routes/RoutingPath";


/**-------------------------------------
    Styled Components for App layout
----------------------------------------*/
const AppShell = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    background: var(--primary-color);
`;

const PublicShell = styled.div`
    min-height: 100vh;
    background: var(--primary-color);
    display: grid;
    grid-template-rows: 1fr;
`;

const Main = styled.main`
    padding-bottom: env(safe-area-inset-bottom);
`;

// Main application component export
function App() {
    const location = useLocation();

    // Pages that should NOT show the authenticated layout chrome (nav/footer)
    const isPublicAuthPage =
        matchPath({ path: RoutingPath.usersLogInView, end: true }, location.pathname) ||
        matchPath({ path: RoutingPath.signUpFormView, end: true }, location.pathname);

    return (
        <UserProvider>
            <AuthBootstrap>
                {isPublicAuthPage ? (
                    <PublicShell>
                        <Main>
                            <Routing />
                        </Main>
                    </PublicShell>
                ) : (
                    <AppShell>
                        <NavigationBar />
                        <Main>
                            <Routing />
                        </Main>
                        <FooterContainer />
                    </AppShell>
                )}
            </AuthBootstrap>
        </UserProvider>
    );
}

export default App;
