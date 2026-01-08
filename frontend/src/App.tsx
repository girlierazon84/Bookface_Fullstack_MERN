// frontend/src/App.tsx

import { Routing } from "./routes/Routing";
import FooterContainer from "./components/FooterContainer";
import NavigationBar from "./components/nav/NavigationBar";
import { UserProvider } from "./utils/global/provider/UserProvider";


function App() {
    return (
        <UserProvider>
            <Routing>
                <NavigationBar />
            </Routing>
            <FooterContainer />
        </UserProvider>
    );
}

export default App;
