import React, { useEffect, useState } from 'react';
import { UserContext } from './utils/global/provider/UserProvider';
import { Routing } from "./routes/Routing";
import FooterContainer from "./components/FooterContainer";
import NavigationBar from "./components/nav/NavigationBar";


function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState<string>('')

    const checkIfUserIsAuthenticatedInBrowser = () => {
        const username = localStorage.getItem('username')
        if (username === 'string') {
            setAuthenticatedUser(username)
        }
    }

    useEffect(() => {
        checkIfUserIsAuthenticatedInBrowser()
    }, [])

    return (
        <UserContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
            <Routing>
                <NavigationBar />
            </Routing>
            <FooterContainer/>
        </UserContext.Provider>
    )
}




export default App;
