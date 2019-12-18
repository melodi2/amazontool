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
    // const progress = useSelector(state => state && state.progress);
    let isCheckedWP1 = useSelector(state => state && state.isCheckedWP1);
    let isCheckedWP2 = useSelector(state => state && state.isCheckedWP2);
    let isCheckedLP1 = useSelector(state => state && state.isCheckedLP1);
    let isCheckedLP2 = useSelector(state => state && state.isCheckedLP2);
    let isCheckedAll = useSelector(state => state && state.isCheckedAll);

    // useEffect(() => {
    // console.log(`useEffect running`);
    // dispatch(receiveResults());
    // });

    return (
        <div className="center">
            <div className="progressBox center">
                <Progressbar />
                <h3>
                    Select the criteria that you want to optimize the keywords
                    by
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
                                Winning P1
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
                                Winning P2
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
                                Losing P1
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
                                Losing P2
                            </label>
                        </li>
                    </ul>

                    <button
                        onClick={e => {
                            dispatch(
                                receiveResults(
                                    isCheckedWP1,
                                    isCheckedWP2,
                                    isCheckedLP1,
                                    isCheckedLP2
                                )
                            );
                            console.log("dispatch reveice results");
                        }}
                    >
                        <Link to="/load">Submit</Link>
                    </button>
                </form>
            </div>
        </div>
    );
}
