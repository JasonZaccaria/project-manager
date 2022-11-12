import { ProtectedResponseType } from "../protectedRoutes/protectedResponseType";

const homeVerifyLogin = async (setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {

    try {
        if (window.localStorage.getItem("jwt") != null) {
            const response = await fetch("http://localhost:8080/api/testlogin", {
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
                //console.log("Hi testing logged in funcion if true");
                //here we will conditionally load over the loggedin navbar feature
            } else {
                return setLoggedIn(false);
                //console.log("Hi testing logged in funcion if flase");
                //here we will conditionally lod over the regular navbar

            }
        }
    } catch (e) {
        return setLoggedIn(false);
        //console.log("Hi testing logged in funcion if failure");
        //here we will conditionally load over the regular navbar
    }
}

export { homeVerifyLogin };