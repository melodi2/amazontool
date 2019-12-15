import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveResults } from "./actions";

export function Results() {
    /* ... */
    const dispatch = useDispatch();
    const keywords = useSelector(state => state && state.results);

    useEffect(() => {
        console.log(`useEffect running`);
        dispatch(receiveResults());
    }, []);

    return (
        <div>
            <p>Results - Keywords</p>
        </div>
    );
}
