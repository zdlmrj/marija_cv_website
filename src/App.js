import './App.css';
import {useMemo} from "react";

import Main from "./components/Main";
import Contact from "./components/Contact";
import Login from "./components/Login";

function App() {
    const location = useMemo(() => {
        return window.location.href;
    }, [window.location.href])

    if (location.includes('login')) {
        return <Login/>;
    }

    if(location.includes('contact')) {
        return <Contact privateArea={location.includes('private-area')}/>
    }
    return(
        <Main privateArea={location.includes('private-area')}/>
    )
}

export default App;
