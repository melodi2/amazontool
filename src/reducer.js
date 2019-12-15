export default function reducer(state = {}, action) {
    console.log("state: ", state);
    if (action.type == "RECEIVE_RESULTS") {
        state = {
            ...state,
            results: action.results
        };
    }
    return state;
}
