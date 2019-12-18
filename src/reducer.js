export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_RESULTS") {
        state = {
            ...state,
            success: action.success
        };
    }

    if (action.type == "SELECT_ALL") {
        state = {
            ...state,
            isCheckedAll: action.isChecked,
            isCheckedWP1: action.isChecked,
            isCheckedWP2: action.isChecked,
            isCheckedLP1: action.isChecked,
            isCheckedLP2: action.isChecked
        };
    }

    if (action.type == "WINNING_P1") {
        state = {
            ...state,
            isCheckedWP1: !action.isChecked
        };
    }
    if (action.type == "WINNING_P2") {
        state = {
            ...state,
            isCheckedWP2: !action.isChecked
        };
    }
    if (action.type == "LOSING_P1") {
        state = {
            ...state,
            isCheckedLP1: !action.isChecked
        };
    }
    if (action.type == "LOSING_P2") {
        state = {
            ...state,
            isCheckedLP2: !action.isChecked
        };
    }
    return state;
}
