import React, { Component, Dispatch } from "react";
import Search from "./Search";
import BookList from "./BookList/BookList";
import { Alert, Col, Container, Row } from "reactstrap";
import OutsideAlerter from "./OutsideAlerter";
import { connect } from "react-redux";
import { SuggestionActions, SearchActions, BookActions } from "../actions";
import { BookTypes } from "../types";
import Loading from "./Loader/Loading";

type OwnProps = {
  setTitle: (text: string) => any;
};
type StateProps = {
  keyword: string;
  suggestions: BookTypes.Book[];
  remainingResults: number;
  isLoading: boolean;
};
type DispatchProps = {
  dispatchOnTyped: (text: string) => any;
  dispatchSearch: (text: string) => any;
  dispatchSelectBook: (id: number) => any;
};
type State = {
  typed: boolean;
  hideSuggestions: boolean;
};
type Props = OwnProps & StateProps & DispatchProps;
const { onTyped } = SuggestionActions;
const { searchKeyword } = SearchActions;
const { selectBook } = BookActions;
class SearchBooks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.closeSuggestions = this.closeSuggestions.bind(this);
    this.onTyped = this.onTyped.bind(this);
    this.state = {
      hideSuggestions: false,
      typed: false
    };
    props.setTitle("Search Books");
  }

  onTyped(query: string) {
    this.setState({ hideSuggestions: false, typed: true });
    this.props.dispatchOnTyped(query);
  }

  closeSuggestions() {
    this.setState({
      hideSuggestions: true
    });
  }

  render() {
    const {
      isLoading,
      keyword,
      dispatchSearch: search,
      suggestions,
      dispatchSelectBook: selectBook,
      remainingResults
    } = this.props;
    const { hideSuggestions, typed } = this.state;
    return (
      <Container fluid={true}>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Search value={keyword} search={search} onTyped={this.onTyped} />
          </Col>
        </Row>
        {isLoading && <Loading />}
        {!hideSuggestions && !isLoading && (
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <OutsideAlerter
                onClickOutside={this.closeSuggestions}
                children={
                  <div>
                    <BookList
                      onEndReached={() => {}}
                      books={suggestions}
                      onClick={selectBook}
                      notifyOnScrollEnd={false}
                    />
                    {remainingResults > 0 && (
                      <button onClick={() => search(keyword)}>
                        View {remainingResults} more Results
                      </button>
                    )}
                  </div>
                }
              />
              {suggestions.length === 0 && typed && (
                <Alert color={"info"}>No Results </Alert>
              )}
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: OwnProps): StateProps => {
  const { isLoading } = state;
  const {
    typedWord: keyword,
    suggestions,
    remainingResults
  } = state.suggestion;
  return {
    isLoading: isLoading,
    keyword: keyword,
    suggestions: suggestions,
    remainingResults: remainingResults
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
  return {
    dispatchOnTyped: (text: string) => {
      dispatch(onTyped(text));
    },
    dispatchSearch: (text: string) => {
      dispatch(searchKeyword(text));
    },
    dispatchSelectBook: (id: number) => dispatch(selectBook(id))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SearchBooks);
