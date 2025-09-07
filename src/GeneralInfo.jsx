import { useState } from "react";
import CustomButton from "./CustomButton";

function GeneralInfo() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("johndoe@gmail.com");
    const [phone, setPhone] = useState("123-456-7890");
    const [isDisabled, setDisabled] = useState(true);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEdit = () => {
        setDisabled(!isDisabled);
    }

    return (
        <>
            <div>
                <form>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            disabled={isDisabled}
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            disabled={isDisabled}
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type="tel"
                            disabled={isDisabled}
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                </form>
            </div>
            <h1>{name}</h1>
            <h3>{email}</h3>
            <h3>{phone}</h3>
            <CustomButton handleClick={handleEdit} text={isDisabled ? "Edit" : "Save"} />
        </>
    );
}

export default GeneralInfo;