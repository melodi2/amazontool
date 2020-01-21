import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Tool from "./tool";
import Uploader from "./uploader";
import { Checkbox } from "./checkbox";
import { Load } from "./load";
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
                            <img className="logo" src="/img/newlogo.png" />

                            <Link to="/">Guide</Link>
                            <Link to="/results">Results</Link>
                            <a href="/logout">Log out</a>

                            <img
                                className="profilePic"
                                src="/img/profile.png"
                            />
                        </div>

                        <Route exact path="/" render={() => <Tool />} />
                        <Route
                            exact
                            path="/allresults"
                            render={() => <Results />}
                        />
                        <Route exact path="/upload" component={Uploader} />
                        <Route
                            exact
                            path="/check-criteria"
                            component={Checkbox}
                        />
                        <Route exact path="/results" component={Load} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
