import axios from "./axios";

export async function receiveResults() {
    const { data } = await axios.get("/results.json");
    console.log("data", data);
    return {
        type: "RECEIVE_RESULTS",
        results: data
    };
}

export async function selectAll(val) {
    console.log("val", val);
    return {
        type: "SELECT_ALL",
        isChecked: true
    };
}

export async function winningP1(val) {
    console.log("val", val);
    return {
        type: "WINNING_P1",
        isChecked: val
    };
}

export async function winningP2(val) {
    return {
        type: "WINNING_P2",
        isChecked: val
    };
}

export async function losingP1(val) {
    return {
        type: "LOSING_P1",
        isChecked: val
    };
}

export async function losingP2(val) {
    return {
        type: "LOSING_P2",
        isChecked: val
    };
}
