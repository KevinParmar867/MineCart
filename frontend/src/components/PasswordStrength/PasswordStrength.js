import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import Card from "../Card/Card";

const PasswordStrengthIndicator = ({ password, onStrengthChange }) => {
    const timesIcon = <FaTimes color="red" size={15} />;
    const checkIcon = <BsCheck2All color="green" size={15} />;

    const [uCase, setUCase] = useState(false);
    const [num, setNum] = useState(false);
    const [sChar, setSChar] = useState(false);
    const [passLength, setPassLength] = useState(false);

    useEffect(() => {
        // Check Lower and Uppercase
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            setUCase(true);
        } else {
            setUCase(false);
        }
        // Check For Numbers
        if (password.match(/([0-9])/)) {
            setNum(true);
        } else {
            setNum(false);
        }
        // Check For Special char
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
            setSChar(true);
        } else {
            setSChar(false);
        }
        // Check if password up to 6
        if (password.length > 7) {
            setPassLength(true);
        } else {
            setPassLength(false);
        }

        // Pass strength parameters to the parent component
        onStrengthChange(uCase, num, sChar, passLength);
    }, [password, uCase, num, sChar, passLength, onStrengthChange]);

    const switchIcon = (condition) => {
        return condition ? checkIcon : timesIcon;
    };

    return (
        <Card cardClass="group">
            <ul className="form-list">
                <li>
                    <span className="indicator --dis-flex">
                        {switchIcon(uCase)}
                        &nbsp; Lowercase & Uppercase
                    </span>
                </li>
                <li>
                    <span className="indicator --dis-flex">
                        {switchIcon(num)}
                        &nbsp; Number (0-9)
                    </span>
                </li>
                <li>
                    <span className="indicator --dis-flex">
                        {switchIcon(sChar)}
                        &nbsp; Special Character (!@#$%^&*)
                    </span>
                </li>
                <li>
                    <span className="indicator --dis-flex">
                        {switchIcon(passLength)}
                        &nbsp; At least 8 Character
                    </span>
                </li>
            </ul>
        </Card>
    );
};

export default PasswordStrengthIndicator;