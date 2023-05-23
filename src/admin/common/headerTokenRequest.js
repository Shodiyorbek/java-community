function headerTokenRequest() {
    const string = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${JSON.parse(string)}`,
        "Content-Type": "application/json"
    }
}

export default headerTokenRequest;