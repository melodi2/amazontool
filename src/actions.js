import axios from "./axios";

export async function receiveResults(WP1, WP2, LP1, LP2) {
    const criteria = { WP1, WP2, LP1, LP2 };
    console.log("criteria", criteria);
    const { data } = await axios.post("/results.json", criteria);
    console.log("data", data);
    return {
        type: "RECEIVE_RESULTS",
        success: data.success
    };
}

export async function selectAll(val, checked) {
    console.log("val", val);
    console.log("checked", checked);
    return {
        type: "SELECT_ALL",
        isChecked: checked
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
