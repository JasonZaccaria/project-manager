/*Below are shortcuts for fetch requests*/

const get = async (url: string) => {

    const response = await fetch(url, {

        method: "GET",

        mode: "cors",

        credentials: "include",

        headers: {

            "Content-Type": "application/json"

        }

    })

    const readResponse = await response.json();

    return readResponse;

}

 

const post = async (url: string, postObject: Object): Promise<Object> => {

    const response = await fetch(url, {

        method: "POST",

        mode: "cors",

        credentials: "include",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(postObject)

    })

    const readResponse = await response.json();

    return readResponse;

}

 

export { post, get };