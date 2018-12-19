import React, {Component} from 'react';
import BookList from "./BookList";
import PropTypes from 'prop-types';
import {Alert, Col, Container, Row} from 'reactstrap';
import BookSuggestion from "./Book";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            isLoading: true,
            nextPage: 1,
            renderedResults: []
        };
        props.setTitle(props.keyword);
        this.scrolledToBottom = this.scrolledToBottom.bind(this);
    }

    scrolledToBottom() {
        console.log("results: " + this.state.results.length, "rendered: " + this.state.renderedResults.length, "Loading : " + this.state.isLoading);
        if (!this.state.isLoading) {
            this.setState({
                isLoading: true
            });
            let remainingLoaded = this.state.results.length - this.state.renderedResults.length;
            console.log("rr: " + this.state.results.slice(10, 20));
            let rendered = false;
            if (remainingLoaded > 0) {
                //show exisiting

                this.setState((state) => {
                    const index = state.results.length - remainingLoaded;
                    console.log(index);
                    return {
                        renderedResults: state.renderedResults.concat(state.results.slice(index, index + 10)),
                        isLoading: false
                    }
                });
                rendered = true;
                remainingLoaded -= 10;

            }
            if (remainingLoaded < 10 && this.state.nextPage > 0) {
                //load more
                this.fetchBooks(this.props.keyword, this.state.nextPage).then((data) => {
                    this.setState((state) => {
                        const results = state.results.concat(data.suggestions.map((book) => new BookSuggestion(book.id, book.title, book.author)));
                        const index = results.length - remainingLoaded;
                        console.log(index);
                        let result = {
                            results: results,
                            nextPage: data.nextPage, isLoading: false
                        };
                        if (rendered)
                            result.renderedResults = state.renderedResults.concat(results.slice(index, index + 10));
                        return result;
                    });
                });
            }
        }
    }

    componentWillMount() {
        this.fetchBooks(this.props.keyword, this.state.nextPage).then((data) => {
            const books = data.suggestions.map((book) => new BookSuggestion(book.id, book.title, book.author));
            this.setState({
                results: books,
                nextPage: data.nextPage, isLoading: false,
                renderedResults: books.slice(0, 10)
            });
        });
    }

    fetchBooks(keyword, nextPage) {
        console.log("fetch");
        return new Promise(function (resolve, reject) {
            fetch("/results?keyword=" + keyword + "&page=" + nextPage)
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        // Examine the text in the response
                        response.json().then(function (data) {
                            console.log(data);
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

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col md={{size: 8, offset: 2}}>
                        <BookList onEndReached={this.scrolledToBottom} books={this.state.renderedResults}
                                  notifyOnScrollEnd={true}/>
                        {this.state.nextPage < 0 && <Alert color={"info"}>No More Results</Alert>}
                    </Col>
                </Row>
            </Container>
        );
    }
}

SearchResult.propTypes = {
    keyword: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired
};

export default SearchResult;
