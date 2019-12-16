import axios from "./axios";

export async function receiveResults() {
    console.log("actions get results");
    const { data } = await axios.get("/results.json");
    console.log("data", data);
    return {
        type: "RECEIVE_RESULTS",
        results: data
    };
}
