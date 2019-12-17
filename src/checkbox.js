import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveResults,
    selectAll,
    winningP1,
    winningP2,
    losingP1,
    losingP2
} from "./actions";

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
    //     console.log(`useEffect running`);
    //     dispatch(receiveResults());
    // }, []);

    return (
        <div className="checkbox">
            <div className="checkbox-container">
                <p>Checkbox</p>
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
                        Select all (Recommended)
                    </label>

                    <label htmlFor="winningP1">
                        <input
                            type="checkbox"
                            name="winningP1"
                            onChange={e => dispatch(winningP1(isCheckedWP1))}
                            checked={isCheckedAll}
                        />
                        Winning P1
                    </label>

                    <label htmlFor="winningP2">
                        <input
                            type="checkbox"
                            name="winningP2"
                            onChange={e => dispatch(winningP2(isCheckedWP2))}
                            checked={isCheckedAll}
                        />
                        Winning P2
                    </label>

                    <label htmlFor="losingP1">
                        <input
                            type="checkbox"
                            name="loosingP1"
                            onChange={e => dispatch(losingP1(isCheckedLP1))}
                            checked={isCheckedAll}
                        />
                        Losing P1
                    </label>

                    <label htmlFor="losingP2">
                        <input
                            type="checkbox"
                            name="loosingP2"
                            onChange={e => dispatch(losingP2(isCheckedLP2))}
                            checked={isCheckedAll}
                        />
                        Losing P2
                    </label>

                    <button onClick={e => dispatch(receiveResults())}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
