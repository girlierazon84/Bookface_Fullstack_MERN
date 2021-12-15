import React, { useEffect, useState } from 'react';
import { UserContext } from './utils/global/provider/UserProvider';
// import NavigationBar from "./components/NavigationBar";
import { Routing } from "./routes/Routing";
import Navbar from "./components/Nav/Navbar";


function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState<string>('')

    const checkIfUserIsAuthenticatedInBrowser = () => {
        const username = localStorage.getItem('username')
        if (typeof username === 'string') {
            setAuthenticatedUser(username)
        }
    }

    useEffect(() => {
        checkIfUserIsAuthenticatedInBrowser()
    }, [])

    return (
        <UserContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
            <Routing>
                {/*<NavigationBar/>*/}
                <Navbar />
            </Routing>
        </UserContext.Provider>
    )
}




export default App;
