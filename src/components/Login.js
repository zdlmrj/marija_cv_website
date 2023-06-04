import './Login.css';
import {useCallback, useState} from "react";
import Header from "./Header";


function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [checkedValue, setCheckedValue] = useState(true);
    const [error, setError] = useState(false);

    const onCheckedClick = useCallback(() => {
        setCheckedValue(prevState => !prevState)
    }, [setCheckedValue]);

    const onUsernameChange = useCallback((e) => {
        let value = e.target.value;
        setUsernameInput(value);
    }, [setUsernameInput]);

    const onPasswordChange = useCallback((e) => {
        let value = e.target.value;
        setPasswordInput(value);
    }, [setPasswordInput]);

    const onLoginClick = useCallback(() => {
        if(passwordInput !== "admin" || usernameInput !== "admin") {
            setError(true);
            return;
        }
        else {
            setError(false);
            // window.location.href = (window.location.href.split('/').slice(0, 3).join('/') + "/private-area/");
            window.location.href = (window.location.href.replace("/login", "/private-area/"));
        }
    }, [setError, passwordInput, usernameInput]);

    return(
        <div className="LoginPage">
            <div className="MainContainer LoginContainer">
                <Header />

                <div className={"LoginForm"}>
                    {error && <div className={"Error"}>
                        <snap>
                            Email or password is wrong
                        </snap>
                    </div>}
                    <div className={"LoginDiv"}>
                        <label className={"LoginLabel"}><b>Username</b></label>
                        <input
                            className={"LoginInput"}
                            placeholder={"Enter Username"}
                            value={usernameInput}
                            onChange={onUsernameChange}
                        />

                        <label className={"LoginLabel"}><b>Password</b></label>
                        <input
                            className={"LoginInput"}
                            placeholder={"Enter Password"}
                            value={passwordInput}
                            onChange={onPasswordChange}
                        />

                        <div>
                            <input
                                type="checkbox"
                                checked={checkedValue}
                                onChange={onCheckedClick}
                                className={"CheckBox"}
                            />
                            <label htmlFor="scales">Remember me</label>
                        </div>

                        <div className={"LoginBtnDiv"}>
                            <button
                                className={"LoginBtn"}
                                onClick={onLoginClick}
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                    <div className={"ForgotPassDiv"}>
                        <span>Forgot <a className={"ForgotPassLink"} href="#">password</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;