import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveResults } from "./actions";

export function Load() {
    // const dispatch = useDispatch();
    let results = useSelector(state => state && state.results);
    // console.log("results.LP1results", results.LP1results);
    if (results) {
        var setWP2Results = new Set();
        for (var i = 0; i < results.WP2results.length; i++) {
            console.log(results.WP2results[i].targeting);
            setWP2Results.add(results.WP2results[i].targeting);
        }
        var newWP2Results = [];
        setWP2Results.forEach(li => {
            newWP2Results.push(li);
        });
        console.log("newWP2Results", newWP2Results);
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
                    {!newWP2Results && "loading"}
                    {newWP2Results && newWP2Results.length > 0 && (
                        <div>
                            <h3>Winning Keywords based on CTR</h3>
                            <h5>
                                These are your Winning Keywords based on
                                Click-thru Rate (CTR) and number of Sales.
                                <p>Add these Winners into your Campaigns!</p>
                            </h5>
                        </div>
                    )}
                    {newWP2Results &&
                        newWP2Results.map(el => <p key="">{el}</p>)}
                </div>
            </div>
        </div>
    );
}
