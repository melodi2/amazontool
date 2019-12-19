import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { Progressbar } from "./progress-bar";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.uploadTable = this.uploadTable.bind(this);
    }

    componentDidMount() {
        console.log("uploader has mounted");
    }

    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.files[0]
        });
        console.log("handleChange, inputElement", inputElement.files[0]);
    }

    uploadTable() {
        var fd = new FormData();
        fd.append("file", this.state.file);
        console.log("uploadTable clicked");
        axios
            .post("/upload.json", fd)
            .then(() => {
                console.log("inside post axios");
                // this.setState({
                //     data: data.data
                // });
                // this.props.updateTable(this.state.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="center">
                <div className="progressBox center">
                    <div className="progressbar-wrapper">
                        <ul className="progressbar">
                            <li className="active">Upload File</li>
                            <li>Select Criteria</li>
                            <li>Results</li>
                        </ul>
                    </div>
                    <h3>
                        Upload your Amazon Sponsored Advertising Report here.
                    </h3>
                    <div className="upload-btn-wrapper">
                        <button className="btn">Upload a file</button>

                        <input
                            type="file"
                            name="file"
                            id="file"
                            className="inputfile"
                            accept=".csv"
                            onChange={e => this.handleChange(e.target)}
                        />
                    </div>
                    <button className="green-btn" onClick={this.uploadTable}>
                        Continue
                    </button>
                    <Link to="/check-criteria">Next</Link>
                </div>
            </div>
        );
    }
}
