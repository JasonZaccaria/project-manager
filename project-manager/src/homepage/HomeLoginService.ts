import { ProtectedResponseType } from "../protectedRoutes/protectedResponseType";

const homeVerifyLogin = async (setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {

    try {
        if (window.localStorage.getItem("jwt") != null) {
            const response = await fetch(process.env.REACT_APP_API_TEST_LOGIN as string, {
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
                return setLoggedIn(true);
            } else {
                return setLoggedIn(false);
            }
        }
    } catch (e) {
        return setLoggedIn(false);
    }
}

export { homeVerifyLogin };