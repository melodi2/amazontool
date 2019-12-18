import React from "react";
import { Link } from "react-router-dom";

export default class Tool extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.uploadTable = this.uploadTable.bind(this);
    }

    render() {
        return (
            <div>
                <div className="center">
                    <h3>HOW IT WORKS</h3>
                    <Link to="/upload">Start Here</Link>
                </div>
            </div>
        );
    }
}
