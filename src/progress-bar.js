import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveResults } from "./actions";

export function Progressbar() {
    /* ... */
    // const dispatch = useDispatch();
    // const progress = useSelector(state => state && state.progress);

    // useEffect(() => {
    //     console.log(`useEffect running`);
    //     dispatch(receiveResults());
    // }, []);

    return (
        <div className="progress-bar">
            <div className="progress-bar-container">
                <p>Progress Bar</p>
            </div>
        </div>
    );
}
