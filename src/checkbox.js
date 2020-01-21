import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveResults,
    selectAll,
    winningP1,
    winningP2,
    losingP1,
    losingP2
} from "./actions";
import { Progressbar } from "./progress-bar";

export function Checkbox() {
    /* ... */
    const dispatch = useDispatch();
    let isCheckedWP1 = useSelector(state => state && state.isCheckedWP1);
    let isCheckedWP2 = useSelector(state => state && state.isCheckedWP2);
    let isCheckedLP1 = useSelector(state => state && state.isCheckedLP1);
    let isCheckedLP2 = useSelector(state => state && state.isCheckedLP2);
    let isCheckedAll = useSelector(state => state && state.isCheckedAll);

    return (
        <div className="center">
            <div className="progressBox center">
                <div className="progressbar-wrapper">
                    <ul className="progressbar">
                        <li className="active">Upload File</li>
                        <li className="active">Select Criteria</li>
                        <li>Results</li>
                    </ul>
                </div>
                <h3>
                    Select the criteria for keyword optimization to determine
                    your Winning and Losing Keywords.
                </h3>
                <form>
                    <label htmlFor="selectAll">
                        <input
                            type="checkbox"
                            name="selectAll"
                            onChange={e =>
                                dispatch(
                                    selectAll(isCheckedAll, e.target.checked)
                                )
                            }
                        />
                        Optimize everything (recommended)
                        <div className="info-box">
                            <p>
                                Select all criteria and find all the Winning and
                                Losing Keywords.
                            </p>
                        </div>
                    </label>

                    <ul>
                        <li>
                            <label htmlFor="winningP1">
                                <input
                                    type="checkbox"
                                    name="winningP1"
                                    onChange={e =>
                                        dispatch(winningP1(isCheckedWP1))
                                    }
                                    checked={isCheckedWP1}
                                />
                                Winning Keywords based on ACoS{" "}
                                <div className="info-box">
                                    <p>
                                        Find Winning Keywords by at looking your
                                        Total Advertising Cost of Sales (ACoS)
                                        and number of Sales.
                                    </p>
                                </div>
                            </label>
                        </li>

                        <li>
                            <label htmlFor="winningP2">
                                <input
                                    type="checkbox"
                                    name="winningP2"
                                    onChange={e =>
                                        dispatch(winningP2(isCheckedWP2))
                                    }
                                    checked={isCheckedWP2}
                                />
                                Winning Keywords based on CTR
                                <div className="info-box">
                                    <p>
                                        Find Winning Keywords by looking at your
                                        Click-thru Rate (CTR) and number of
                                        Sales.
                                    </p>
                                </div>
                            </label>
                        </li>

                        <li>
                            <label htmlFor="losingP1">
                                <input
                                    type="checkbox"
                                    name="loosingP1"
                                    onChange={e =>
                                        dispatch(losingP1(isCheckedLP1))
                                    }
                                    checked={isCheckedLP1}
                                />
                                Losing Keywords based on Impressions and CTR
                                <div className="info-box">
                                    <p>
                                        Find Losing Keywords based on number of
                                        Impressions and Click-thru Rate (CTR).
                                    </p>
                                </div>
                            </label>
                        </li>

                        <li>
                            <label htmlFor="losingP2">
                                <input
                                    type="checkbox"
                                    name="loosingP2"
                                    onChange={e =>
                                        dispatch(losingP2(isCheckedLP2))
                                    }
                                    checked={isCheckedLP2}
                                />
                                Losing Keywords based on Clicks and Sales
                                <div className="info-box">
                                    <p>
                                        Find Losing Keywords based on number of
                                        Clicks and Sales.
                                    </p>
                                </div>
                            </label>
                        </li>
                    </ul>
                </form>
                <Link to="/results">
                    <button
                        className="green-btn"
                        onClick={e => {
                            dispatch(
                                receiveResults(
                                    isCheckedWP1,
                                    isCheckedWP2,
                                    isCheckedLP1,
                                    isCheckedLP2
                                )
                            );
                        }}
                    >
                        Submit
                    </button>
                </Link>
            </div>
        </div>
    );
}
