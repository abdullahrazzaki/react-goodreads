import React, {Component} from 'react';
import Search from './Search';
import BookList from "./BookList";
import PropTypes from 'prop-types';
import {Alert, Col, Container, Row} from 'reactstrap';
import OutsideAlerter from "./OutsideAlerter";
import {connect} from 'react-redux';
import {changeTitle, onTyped, searchKeyword} from "./actions";

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.closeSuggestions = this.closeSuggestions.bind(this);
        this.onTyped = this.onTyped.bind(this);
        this.state = {
            hideSuggestions: false,
            typed: false
        };
        props.setTitle("Search Books");
        console.log(props);

    }

    onTyped(query) {
        console.log("Typed : " + query);
        this.setState({hideSuggestions: false, typed: true});
        this.props.onTyped(query);
        // this.fetchBooks("/suggestions?keyword=" + query).then((res) => {
        //     this.setState({
        //         suggestions: res.suggestions.map((book) => new BookSuggestion(book.id, book.title, book.author)),
        //         remainingCount: res.count,
        //         keyword: query
        //     });
        // });
    }

    search(text) {
        this.props.search(text);
        this.props.history.push("/results/" + text);
    }
    closeSuggestions() {
        this.setState({suggestions: [], remainingCount: 0, hideSuggestions: true});
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col md={{size: 6, offset: 3}}>
                        <Search value={this.props.keyword} search={this.props.search} onTyped={this.onTyped}/>
                    </Col>
                </Row>
                {!this.state.hideSuggestions &&
                <Row>
                    <Col md={{size: 8, offset: 2}}>

                        <OutsideAlerter onClickOutside={this.closeSuggestions} children={
                            <div>
                                <BookList onEndReached={() => {
                                }} books={this.props.suggestions}/>
                                {this.props.remainingResults > 0 &&
                                <button
                                    onClick={() => this.search(this.props.keyword)}>{this.props.remainingResults} more
                                    Results</button>}
                            </div>
                        }

                        />
                        {this.props.suggestions.length === 0 && this.state.typed && !this.state.isLoading &&
                        <Alert color={"info"}>No Results </Alert>}
                    </Col>
                </Row>}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    const {typedWord: keyword, suggestions, remainingResults} = state.suggestion;
    return {keyword: keyword, suggestions: suggestions, remainingResults: remainingResults};
};
const mapDispatchToProps = (dispatch) => {
    return {
        setTitle: (title) => {
            dispatch(changeTitle(title))
        },
        onTyped: (text) => {
            dispatch(onTyped(text))
        },
        search: (text) => {
            dispatch(searchKeyword(text))
        }
    };
};

SearchBooks.propTypes = {
    setTitle: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBooks);