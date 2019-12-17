import React from "react";
import Uploader from "./uploader";
import { Progressbar } from "./progress-bar";
import { Checkbox } from "./checkbox";

export default class Tool extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.uploadTable = this.uploadTable.bind(this);
    }

    render() {
        return (
            <div>
                <h3>Upload your csv file to get started.</h3>
                <Uploader />
                <Progressbar />
                <Checkbox />
            </div>
        );
    }
}
