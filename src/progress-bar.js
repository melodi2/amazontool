import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Progressbar() {
    /* ... */
    // const dispatch = useDispatch();
    // const progress = useSelector(state => state && state.progress);

    // useEffect(() => {
    // }, []);

    return (
        <div className="progressbar-wrapper">
            <ul className="progressbar">
                <li className="active">Step 1</li>
                <li>Step 2</li>
                <li>Step 3</li>
            </ul>
        </div>
    );
}
