import { ProtectedResponseType } from "./protectedResponseType";

const verifyLogin = async (setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        if (window.localStorage.getItem("jwt") != null) {
            const response = await fetch(process.env.REACT_APP_API_TEST_LOGIN as string/*http://localhost:8080/api/testlogin"*/, {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
                }
            });
            const readResponse: ProtectedResponseType = await response.json();
            if (!readResponse.failure) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        } else {
            setLoggedIn(false);
        }
    } catch (e) {
        setLoggedIn(false);
    }
}

export default verifyLogin;