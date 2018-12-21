import React, {Component} from 'react';
import BookList from "./BookList";
import PropTypes from 'prop-types';
import {Alert, Col, Container, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {loadMore, search} from "./actions";
import Loading from "./Loading";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        console.log("PP", props);
        this.state = {
            renderedResults: [],
            isLoading: props.isLoading
        };
        props.search(props.keyword);
        props.setTitle(props.keyword);
        this.scrolledToBottom = this.scrolledToBottom.bind(this);
    }

    scrolledToBottom() {
        console.log("results: " + this.props.results.length, "rendered: " + this.state.renderedResults.length, "Loading : " + this.state.isLoading);
        if (!this.props.isLoading) {
            this.setState({
                isLoading: true
            });
            let remainingLoaded = this.props.results.length - this.state.renderedResults.length;
            if (remainingLoaded > 0) {
                //show exisiting
                const results = this.props.results;
                this.setState((state) => {
                    const index = results.length - remainingLoaded;
                    console.log(index);
                    return {
                        renderedResults: state.renderedResults.concat(results.slice(index, index + 10)),
                        isLoading: false
                    }
                });
                remainingLoaded -= 10;

            }
            if (remainingLoaded < 10 && this.props.nextPage > 0) {
                //load more
                this.props.loadMore(this.props.keyword, this.props.nextPage);
            }
        }
    }

    componentWillMount() {
        this.setState({renderedResults: this.props.results.slice(0, 10)});
    }

    componentDidUpdate() {
        if (this.state.renderedResults.length === 0 && this.props.results.length > 0)
            this.setState({renderedResults: this.props.results.slice(0, 10)});
    }

    render() {
        console.log("chf", this.props);
        return (
            <Container fluid={true}>
                <Row>
                    {this.props.results.length <= 0 && this.props.isLoading && <Col><Loading/></Col>}
                    {this.props.results &&
                    <Col md={{size: 8, offset: 2}}>

                        <BookList onEndReached={this.scrolledToBottom} books={this.state.renderedResults}
                                  notifyOnScrollEnd={true}/>
                        {this.props.nextPage < 0 && <Alert color={"info"}>No More Results</Alert>}
                    </Col>
                    }{
                    !this.props.results && <p>Fetching</p>}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {results, nextPage, isLoading} = state.search;
    return {results: results, nextPage: nextPage, isLoading: isLoading};
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadMore: (text, page) => {
            dispatch(loadMore(text, page))
        },
        search: (text) => {
            dispatch(search(text))
        }
    }
};
SearchResult.propTypes = {
    keyword: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);