// frontend/src/App.tsx

import { Routing } from "./routes/Routing";
import FooterContainer from "./components/FooterContainer";
import NavigationBar from "./components/nav/NavigationBar";
import { UserProvider } from "./utils/global/provider/UserProvider";
import AuthBootstrap from "./utils/auth/AuthBootstrap";


function App() {
    return (
        <UserProvider>
            <AuthBootstrap>
                <Routing>
                    <NavigationBar />
                </Routing>
                <FooterContainer />
            </AuthBootstrap>
        </UserProvider>
    );
}

export default App;
