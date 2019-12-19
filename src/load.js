import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveResults } from "./actions";

export function Load() {
    // const dispatch = useDispatch();
    let results = useSelector(state => state && state.results);
    // console.log("results.LP1results", results.LP1results);
    if (results) {
        for (var i = 0; i < results.WP2results.length; i++) {
            console.log(results.WP2results[i].targeting);
        }
    }

    // useEffect(() => {
    //     console.log(`useEffect running`, results.LP1results);
    // }, []);

    return (
        <div className="center">
            <div className="progressBox center gridBox">
                <div>
                    {results && results.WP2results && <h3>Winning Keywords</h3>}
                    {results && results.WP2results.map(el => el.targeting)}
                </div>
                <div>
                    <h3>Winning Keywords</h3>
                </div>

                <div>
                    <h3>Losing Keywords</h3>
                    {results && results.LP1results[0].targeting}
                </div>

                <div>
                    <h3>Losing Keywords</h3>
                </div>
            </div>
        </div>
    );
}
