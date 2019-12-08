import React from "react";
import axios from "./axios";

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
        console.log("handleChange, inputElement", inputElement);
        // this.setState({
        //     [inputElement.name]: inputElement
        // });
    }

    uploadTable() {
        // var fd = new FormData();
        // fd.append("file", this.state.data);
        console.log("uploadTable clicked");
        axios
            .post("/upload.json")
            .then(({ data }) => {
                console.log("inside post axios, data", data);
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
            <div>
                <h3>Uploader</h3>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="inputfile"
                    accept=".csv"
                    onChange={e => this.handleChange(e.target)}
                />
                <button onClick={this.uploadTable}>UPLOAD</button>
            </div>
        );
    }
}
