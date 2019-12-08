import React from "react";
import Uploader from "./uploader";

export default class Tool extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.uploadTable = this.uploadTable.bind(this);
    }

    render() {
        return (
            <div>
                <h3>This is the Tool component</h3>
                <Uploader />
            </div>
        );
    }
}
