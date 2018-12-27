import React, { Component, Dispatch } from "react";
import BookList from "./BookList/BookList";
import { Alert, Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { SearchActions, BookActions } from "../actions";
import Loading from "./Loader/Loading";
import { BookTypes } from "../types";
import { slice, unionWith, prop } from "ramda";
import eqBy from "ramda/es/eqBy";
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
    const { isLoading, loadMore, keyword, nextPage, results } = this.props;

    if (!isLoading) {
      this.setState({
        isLoading: true
      });
      let remainingLoaded = results.length - this.state.renderedResults.length;
      if (remainingLoaded > 0) {
        //show exisiting
        this.setState(state => {
          const index = results.length - remainingLoaded;
          console.log(index);
          return {
            renderedResults: unionWith(
              eqBy(prop("id")),
              state.renderedResults,
              slice(index, index + 10, results)
            ),
            isLoading: false
          };
        });
        remainingLoaded -= 10;
      }
      if (remainingLoaded < 10 && nextPage > 0) {
        //load more
        loadMore(keyword, nextPage);
      }
    }
  }

  componentWillMount() {
    this.setState({ renderedResults: slice(0, 10, this.props.results) });
  }

  componentDidUpdate() {
    const { results } = this.props;
    if (this.state.renderedResults.length === 0 && results.length > 0)
      this.setState({ renderedResults: slice(0, 10, results) });
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
