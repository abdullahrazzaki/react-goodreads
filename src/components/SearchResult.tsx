import React, { Component, Dispatch } from "react";
import BookList from "./BookList/BookList";
import { Alert, Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { SearchActions, BookActions } from "../actions";
import Loading from "./Loader/Loading";
import { BookTypes } from "../types";
const { loadMore, search } = SearchActions;
const { selectBook } = BookActions;
type OwnProps = {
  setTitle: (text: string) => any;
  keyword: string;
};
type StateProps = {
  isLoading: boolean;
  results: BookTypes.Book[];
  nextPage: number;
};
type DispatchProps = {
  loadMore: (text: string, page: number) => any;
  search: (text: string) => any;
  selectBook: (id: number) => any;
};
type State = {
  renderedResults: BookTypes.Book[];
  isLoading: boolean;
};
type Props = OwnProps & StateProps & DispatchProps;

class SearchResult extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      renderedResults: [],
      isLoading: props.isLoading
    };
    props.search(props.keyword);
    props.setTitle("Results for : " + props.keyword);
    this.scrolledToBottom = this.scrolledToBottom.bind(this);
  }

  scrolledToBottom() {
    console.log(
      "results: " + this.props.results.length,
      "rendered: " + this.state.renderedResults.length,
      "Loading : " + this.state.isLoading
    );
    if (!this.props.isLoading) {
      this.setState({
        isLoading: true
      });
      let remainingLoaded =
        this.props.results.length - this.state.renderedResults.length;
      if (remainingLoaded > 0) {
        //show exisiting
        const results = this.props.results;
        this.setState(state => {
          const index = results.length - remainingLoaded;
          console.log(index);
          return {
            renderedResults: state.renderedResults.concat(
              results.slice(index, index + 10)
            ),
            isLoading: false
          };
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
    this.setState({ renderedResults: this.props.results.slice(0, 10) });
  }

  componentDidUpdate() {
    const { results } = this.props;
    if (this.state.renderedResults.length === 0 && results.length > 0)
      this.setState({ renderedResults: results.slice(0, 10) });
  }

  render() {
    const { results, isLoading, nextPage, selectBook } = this.props;
    return (
      <Container fluid={true}>
        <Row>
          {results.length <= 0 && isLoading && (
            <Col>
              <Loading />
            </Col>
          )}
          {results && (
            <Col md={{ size: 8, offset: 2 }}>
              <BookList
                onEndReached={this.scrolledToBottom}
                books={this.state.renderedResults}
                notifyOnScrollEnd={true}
                onClick={selectBook}
              />
              {nextPage < 0 && <Alert color={"info"}>No More Results</Alert>}
            </Col>
          )}
          {!results && <p>Fetching</p>}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: any): StateProps => {
  const { isLoading } = state;
  const { results, nextPage } = state.search;
  return { results: results, nextPage: nextPage, isLoading: isLoading };
};
const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
  return {
    loadMore: (text: string, page: number) => {
      dispatch(loadMore(text, page));
    },
    search: (text: string) => {
      dispatch(search(text));
    },
    selectBook: (id: number) => dispatch(selectBook(id))
  };
};
export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult);
