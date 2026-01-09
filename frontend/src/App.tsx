// frontend/src/App.tsx

import styled from "styled-components";

import { Routing } from "./routes/Routing";
import FooterContainer from "./components/FooterContainer";
import NavigationBar from "./components/nav/NavigationBar";
import { UserProvider } from "./utils/global/provider/UserProvider";
import AuthBootstrap from "./utils/auth/AuthBootstrap";


// Main application component export
function App() {
    return (
        <UserProvider>
            <AuthBootstrap>
                <AppShell>
                    <NavigationBar />
                    <Main>
                        <Routing />
                    </Main>
                    <FooterContainer />
                </AppShell>
            </AuthBootstrap>
        </UserProvider>
    );
}

export default App;


/**-------------------------------------
    Styled Components for App layout
----------------------------------------*/
const AppShell = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    background: var(--primary-color);
`;

const Main = styled.main`
    padding-bottom: env(safe-area-inset-bottom);
`;
