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
        this.search = this.search.bind(this);
        this.loadMoreTweets = this.loadMoreTweets.bind(this);
        this.onTweetsUpdated = this.onTweetsUpdated.bind(this);
        this.state = {
            tweets: [],
            isLoading: false,
            nextURL: '',
            title: 'GoodReads',
            isHome: window.location.pathname === "/"
        };
    }

    loadMoreTweets() {
        console.log("Loading: " + this.state.isLoading);
        if (!this.state.isLoading) {
            this.setState({isLoading: true});
            this.fetchTweets(this.state.nextURL).then((tweets, next) => {
                this.onTweetsUpdated(this.state.tweets.concat(tweets), next);
            });
        }
    }

    fetchTweets(url) {
        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response
                        response.json().then(function (data) {
                            console.log(data.tweets, data.nextURL);
                            resolve(data.tweets, data.nextURL);
                            console.log(this.state.tweets);
                        });
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                    reject(err);
                });

        });
    }

    onTweetsUpdated(tweets, next) {
        console.log("gtt");
        this.setState({tweets: tweets, nextURL: next, isLoading: false});
    }

    search(query) {

        console.log("Searched " + query);
        this.setState({isLoading: true});
        this.fetchTweets("./tweets?keyword=" + query).then(this.onTweetsUpdated);
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
