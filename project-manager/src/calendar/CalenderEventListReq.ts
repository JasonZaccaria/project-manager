const CalendarEventListReq = async (url: string): Promise<void> => {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
        }
    })

    const readResponse = await response.json();
    console.log(readResponse);
}

export { CalendarEventListReq };