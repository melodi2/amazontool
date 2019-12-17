import React from "react";
// import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Tool from "./tool";
import Uploader from "./uploader";
import { Checkbox } from "./checkbox";
import { Results } from "./results";

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
                <BrowserRouter>
                    <div>
                        <div className="header">
                            <img className="logo" src="/img/logo.png" />

                            <Link to="/">Start Here</Link>
                            <Link to="/results">Results</Link>
                            <a href="/logout">Log out</a>

                            <img className="logo" src="/img/logo.png" />
                        </div>

                        <Route exact path="/" render={() => <Tool />} />
                        <Route
                            exact
                            path="/results"
                            render={() => <Results />}
                        />
                        <Route exact path="/upload" component={Uploader} />
                        <Route
                            exact
                            path="/check-criteria"
                            component={Checkbox}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
