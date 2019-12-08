import React from "react";
// import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import Tool from "./tool";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};

        this.updateTable = this.updateTable.bind(this);
    }

    componentDidMount() {
        console.log("app has mounted");
    }

    updateTable(newData) {
        this.setState({
            data: newData
        });
    }

    render() {
        // if (!this.state.id) {
        //     return null;
        // }
        return (
            <div>
                <h1>This is the App.js</h1>
                <BrowserRouter>
                    <div>
                        <div>
                            <img className="logo" src="/img/logo.png" />
                        </div>
                        <Route exact path="/" render={() => <Tool />} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
