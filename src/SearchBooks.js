import React, {Component} from 'react';
import Search from './Search';
import BookList from "./BookList";
import PropTypes from 'prop-types';
import {Alert, Col, Container, Row} from 'reactstrap';
import OutsideAlerter from "./OutsideAlerter";
import BookSuggestion from "./Book";

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.onBooksUpdated = this.onBooksUpdated.bind(this);
        this.closeSuggestions = this.closeSuggestions.bind(this);
        this.onTyped = this.onTyped.bind(this);
        this.state = {
            keyword: '',
            suggestions: [],
            remainingCount: 0,
            hideSuggestions: false,
            typed: false
        };
        props.setTitle("Search Books");
    }

    onTyped(query) {
        console.log("Typed : " + query);
        this.setState({hideSuggestions: false, typed: true});
        this.fetchBooks("/suggestions?keyword=" + query).then((res) => {
            this.setState({
                suggestions: res.suggestions.map((book) => new BookSuggestion(book.id, book.title, book.author)),
                remainingCount: res.count,
                keyword: query
            });
        });
    }

    fetchBooks(url) {
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
                            resolve(data);
                        });
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                    reject(err);
                });

        });
    }

    onBooksUpdated(books) {
        console.log("gtt");
        this.setState({suggestions: books, isLoading: false});
    }

    search(query) {
        this.props.history.push("/results/" + query);
    }

    closeSuggestions() {
        this.setState({suggestions: [], remainingCount: 0, hideSuggestions: true});
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col md={{size: 6, offset: 3}}>
                        <Search search={this.search} onTyped={this.onTyped}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={{size: 8, offset: 2}}>
                        {!this.state.hideSuggestions &&
                        <OutsideAlerter onClickOutside={this.closeSuggestions} children={
                            <div>
                                <BookList onEndReached={() => {
                                }} books={this.state.suggestions}/>
                                {this.state.remainingCount > 0 && <button
                                    onClick={() => this.props.history.push("/results/" + this.state.keyword)}>{this.state.remainingCount} more
                                    Results</button>}
                            </div>
                        }

                        />}
                        {this.state.suggestions.length === 0 && this.state.typed && !this.state.isLoading &&
                        <Alert color={"info"}>No Results </Alert>}
                    </Col>
                </Row>
            </Container>
        );
    }
}

SearchBooks.propTypes = {
    setTitle: PropTypes.func.isRequired
};

export default SearchBooks;
