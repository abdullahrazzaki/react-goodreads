import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import {Container, Row} from 'reactstrap';
import {BrowserRouter as Router, Route} from "react-router-dom";
import SearchBooks from "./SearchBooks";
import SearchResult from "./SearchResult";
import BookDetail from "./BookDetail";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'GoodReads',
            isHome: window.location.pathname === "/"
        };
    }

    render() {
        const setTitle = (title) => this.setState({title: title});
        return (
            <div className="App">
                <main>
                    <Router>
                        <div>

                            <Header isHome={this.state.isHome} title={this.state.title}/>
                            <Container fluid={true}>
                                <Row className={"mt-3"}>
                                    <Route
                                        path="/" exact render={(props) => {
                                        return <SearchBooks setTitle={setTitle} {...props} />;
                                    }}/>
                                    <Route path="/results/:keyword" render={({match}) => {
                                        const key = match.params.keyword;
                                        return <SearchResult setTitle={setTitle} keyword={key}/>;
                                    }}/>
                                    <Route path="/book/:id" render={({match}) => {
                                        const key = match.params.id;
                                        return <BookDetail setTitle={setTitle} id={parseInt(key)}/>;
                                    }}/>

                                </Row>
                            </Container>
                        </div>
                    </Router>
                </main>
            </div>
        );
    }
}
export default App;