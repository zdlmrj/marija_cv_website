import './Contact.css';
import {useCallback, useState} from "react";
import Header from "./Header";


function Contact({privateArea}) {
    const [emailInput, setEmailInput] = useState('marija_zdolsek@yahoo.com');
    const [phoneInput, setPhoneInput] = useState('+39 327 635 64 67');
    const [addressInput, setAddressInput] = useState('Via Filippo Carcano 7, 20149 Milano, Italy');

    const onInfoChange = useCallback((type) => (e) => {
        let value = e.target.value;
        switch (type) {
            case "email":
                setEmailInput(value);
                break;
            case "phone":
                setPhoneInput(value);
                break;
            case "address":
                setAddressInput(value);
                break;
            default:
                break;
        }

    }, [setEmailInput, setPhoneInput, setAddressInput]);

    const [nameInput, setNameInput] = useState('');
    const onNameChange = useCallback((e) => {
        let value = e.target.value;
        setNameInput(value);
    }, [setNameInput]);

    const [emailSenderInput, setEmailSenderInput] = useState('');

    const onEmailSenderChange = useCallback((e) => {
        let value = e.target.value;
        setEmailSenderInput(value);
    }, [setEmailSenderInput]);

    const [subjectInput, setSubjectInput] = useState('');

    const onSubjectChange = useCallback((e) => {
        let value = e.target.value;
        setSubjectInput(value);
    }, [setSubjectInput]);

    const [messageInput, setMessageInput] = useState('');

    const onMessageChange = useCallback((e) => {
        let value = e.target.value;
        setMessageInput(value);
    }, [setMessageInput]);

    const sendEmail = useCallback(() => {
        let link = 'mailto:'+ emailInput + '?subject=Message from ' +
            emailSenderInput + '&subject=' + subjectInput + '&body=' + encodeURIComponent('name:\n' + nameInput + '\n\nmessage:\n' + messageInput);
        window.location.href = link;
    }, [messageInput, emailSenderInput, subjectInput])

    return(
        <div className="ContactPage">
            <div className="ContactContainer">
                <Header />

                <div className={"ContactForm"}>
                    <div className={"ContactInfoContainer"}>
                        <div>
                            <div className={"ContactInfo"}>
                                <i className="material-icons ContactIcons">phone_iphone</i>
                                <div className={"Contact"}>
                                    <h2>
                                        Phone:
                                    </h2>
                                    <input
                                        className={"ContactInput" + (privateArea ? " ContactInputPrivate" : "")}
                                        value={phoneInput}
                                        disabled={!privateArea}
                                        onChange={onInfoChange("phone")}
                                    />
                                </div>
                            </div>
                            <div className={"ContactInfo"}>
                                <i className="material-icons ContactIcons">mail</i>
                                <div className={"Contact"}>
                                    <h2>
                                        Email:
                                    </h2>
                                    <input
                                        className={"ContactInput" + (privateArea ? " ContactInputPrivate" : "")}
                                        value={emailInput}
                                        disabled={!privateArea}
                                        onChange={onInfoChange("email")}
                                    />
                                </div>
                            </div>
                            <div className={"ContactInfo"}>
                                <i className="material-icons ContactIcons">location_on</i>
                                <div className={"Contact"}>
                                    <h2>
                                        Address:
                                    </h2>
                                    <input
                                        className={"ContactInput" + (privateArea ? " ContactInputPrivate" : "")}
                                        value={addressInput}
                                        disabled={!privateArea}
                                        onChange={onInfoChange("address")}
                                    />
                                </div>
                            </div>
                        </div>
                        {privateArea && <input type="button" value="Save Changes" className={"SendEmailBtn"}/>}
                    </div>
                    <div className={"ContactInfoContainer"}>
                        <div className={"MessageInfo"}>
                            <h2>
                                Name:
                            </h2>
                            <input
                                className={"MessageInfoInput"}
                                placeholder={'Write your name'}
                                value={nameInput}
                                onChange={onNameChange}
                            />
                        </div>
                        <div className={"MessageInfo"}>
                            <h2>
                                Email:
                            </h2>
                            <input
                                className={"MessageInfoInput"}
                                placeholder={'Write your email'}
                                value={emailSenderInput}
                                onChange={onEmailSenderChange}
                            />
                        </div>
                        <div className={"MessageInfo"}>
                            <h2>
                                Subject:
                            </h2>
                            <input
                                className={"MessageInfoInput"}
                                placeholder={'Write the subject of your email'}
                                value={subjectInput}
                                onChange={onSubjectChange}
                            />
                        </div>
                        <div className={"MessageInfo"}>
                            <h2>
                                Message:
                            </h2>
                            <textarea
                                className={"MessageInfoTextarea"}
                                placeholder={'Write your message here'}
                                onChange={onMessageChange}
                            />
                        </div>
                        <form method="post" action="">
                            <input type="button" value="Send Email" onClick={sendEmail}  className={"SendEmailBtn"}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;