import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveResults } from "./actions";

export function Checkbox() {
    /* ... */
    // const dispatch = useDispatch();
    // const progress = useSelector(state => state && state.progress);

    // useEffect(() => {
    //     console.log(`useEffect running`);
    //     dispatch(receiveResults());
    // }, []);

    return (
        <div className="checkbox">
            <div className="checkbox-container">
                <p>Checkbox</p>
                <form>
                    <input type="checkbox" name="option1" />
                    <input type="checkbox" name="option2" />
                    <input type="checkbox" name="option3" />
                    <input type="checkbox" name="option4" />
                </form>
            </div>
        </div>
    );
}




    // remove () after handleChecked because you need pass
    // reference to function
    // also add return before <div>
    return <div>
       <input type="checkbox" onChange={ this.handleChecked }/>
       <p>This box is {txt}</p>
    </div>
  }
}
