import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveResults } from "./actions";

export function Load() {
    // const dispatch = useDispatch();
    // useEffect(() => {
    // console.log(`useEffect running`);
    // dispatch(receiveResults());
    // });
    return (
        <div className="center">
            <div className="progressBox center">
                <h3>Loading</h3>
            </div>
        </div>
    );
}
