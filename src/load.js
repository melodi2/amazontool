import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveResults } from "./actions";

export function Load() {
    // const dispatch = useDispatch();
    let results = useSelector(state => state && state.results);
    // console.log("results.LP1results", results.LP1results);
    if (results) {
        ////WINNING OPTION 1/////
        var setWP1Results = new Set();
        for (let i = 0; i < results.WP1results.length; i++) {
            console.log(results.WP1results[i].targeting);
            setWP1Results.add(results.WP1results[i].targeting);
        }
        var newWP1Results = [];
        setWP1Results.forEach(li => {
            newWP1Results.push(li);
        });
        console.log("newWP1Results", newWP1Results);
        ////WINNING OPTION 2/////
        var setWP2Results = new Set();
        for (let i = 0; i < results.WP2results.length; i++) {
            console.log(results.WP2results[i].targeting);
            setWP2Results.add(results.WP2results[i].targeting);
        }
        var newWP2Results = [];
        setWP2Results.forEach(li => {
            newWP2Results.push(li);
        });
        console.log("newWP2Results", newWP2Results);

        ////LOSING OPTION 1/////
        var setLP1Results = new Set();
        for (let i = 0; i < results.LP1results.length; i++) {
            console.log(results.LP1results[i].targeting);
            setLP1Results.add(results.LP1results[i].targeting);
        }
        var newLP1Results = [];
        setLP1Results.forEach(li => {
            newLP1Results.push(li);
        });
        console.log("newLP1Results", newLP1Results);
        ////LOSING OPTION 2/////
        var setLP2Results = new Set();
        for (let i = 0; i < results.LP2results.length; i++) {
            console.log(results.LP2results[i].targeting);
            setLP2Results.add(results.LP2results[i].targeting);
        }
        var newLP2Results = [];
        setLP2Results.forEach(li => {
            newLP2Results.push(li);
        });
        console.log("newLP2Results", newLP2Results);
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
                    {!results && "Loading"}
                    {newWP1Results && newWP1Results.length > 0 && (
                        <div>
                            <h3>Winning Keywords based on ACoS</h3>
                            <h5>
                                These are your Winning Keywords based on your
                                Total Advertising Cost of Sales (ACoS) and
                                number of Sales.
                                <p>Add these Winners into your Campaigns!</p>
                            </h5>
                        </div>
                    )}
                    {newWP1Results &&
                        newWP1Results.map(el => <p key="">{el}</p>)}

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

                    {newLP1Results && newLP1Results.length > 0 && (
                        <div>
                            <h3>
                                Losing Keywords based on Impressions and CTR
                            </h3>
                            <h5>
                                These are your Losing Keywords based on number
                                of Impressions and Click-thru Rate (CTR).
                                <p>Remove these from your Campaigns!</p>
                            </h5>
                        </div>
                    )}
                    {newLP1Results &&
                        newLP1Results.map(el => <p key="">{el}</p>)}

                    {newLP2Results && newLP2Results.length > 0 && (
                        <div>
                            <h3>Losing Keywords based on Clicks and Sales</h3>
                            <h5>
                                These are your Losing Keywords based on number
                                of Clicks and Sales.
                                <p>Remove these from your Campaigns!</p>
                            </h5>
                        </div>
                    )}
                    {newLP2Results &&
                        newLP2Results.map(el => <p key="">{el}</p>)}
                </div>
            </div>
        </div>
    );
}
