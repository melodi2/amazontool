import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveResults } from "./actions";

export function Load() {
    // const dispatch = useDispatch();
    let results = useSelector(state => state && state.results);
    // console.log("results.LP1results", results.LP1results);
    if (results) {
        var setResults = new Set();
        for (var i = 0; i < results.WP2results.length; i++) {
            console.log(results.WP2results[i].targeting);
            setResults.add(results.WP2results[i].targeting);
        }
        var newArray = [];
        setResults.forEach(li => {
            newArray.push(li);
        });
        console.log("newArray", newArray);
    }

    // useEffect(() => {
    //     console.log(`useEffect running`, results.LP1results);
    // }, []);

    return (
        <div className="center">
            <div className="progressBox center">
                <div className="progressbar-wrapper">
                    <ul className="progressbar">
                        <li className="active">Upload File</li>
                        <li className="active">Select Criteria</li>
                        <li className="active">Results</li>
                    </ul>
                </div>
                <div>
                    {!newArray && "loading"}
                    {newArray && newArray.length > 0 && (
                        <div>
                            <h3>Winning Keywords Option 1</h3>
                            <h5>Targeting</h5>
                        </div>
                    )}
                    {newArray && newArray.map(el => <p key="">{el}</p>)}
                </div>
                <div>
                    {results && results.WP1results.length > 0 && (
                        <h3>Winning Keywords Option 2</h3>
                    )}
                    {results && results.WP1results.map(el => el.targeting)}
                </div>

                <div>
                    {results && results.LP1results.length > 0 && (
                        <h3>Losing Keywords Option 1</h3>
                    )}
                    {results && results.LP1results.map(el => el.targeting)}
                </div>

                <div>
                    {results && results.LP2results.length > 0 && (
                        <h3>Losing Keywords Option 2</h3>
                    )}
                    {results && results.LP2results.map(el => el.targeting)}
                </div>
            </div>
        </div>
    );
}
