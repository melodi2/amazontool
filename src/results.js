import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allResults } from "./actions";

export function Results() {
    /* ... */
    const dispatch = useDispatch();
    const keywords = useSelector(state => state && state.results);

    useEffect(() => {
        console.log(`useEffect running`);
        dispatch(allResults());
    }, []);

    return (
        <div className="results">
            <div className="results-container">
                <p>Results - Keywords</p>
                {keywords &&
                    keywords.length != 0 &&
                    keywords.map(el => (
                        <div key={el.id}>
                            <p className="italic">{el.targeting}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
