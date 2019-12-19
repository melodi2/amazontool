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
                    <h2>How It Works</h2>
                    <Link to="/upload">
                        <button className="green-btn">Start Here</button>
                    </Link>
                    <img className="startImg" src="/img/start.png" />
                </div>
            </div>
        );
    }
}
