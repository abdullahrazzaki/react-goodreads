import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import Loading from "./Loader/Loading";
import { BookActions } from "../actions";
import { BookTypes } from "../types";
import { Dispatch } from "react";
const { loadBook } = BookActions;
interface OwnProps {
  setTitle: (text: string) => void;
  id: number;
}
interface DispatchProps {
  loadBook: (id: number) => any;
}
interface StateProps {
  book: BookTypes.BookDetail;
}
type State = {
  isLoaded: boolean;
};
type Props = OwnProps & DispatchProps & StateProps;
class BookDetail extends Component<Props, State> {
  book: BookTypes.Book | undefined = undefined;
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = { isLoaded: false };
    this.props.loadBook(this.props.id);
  }

  componentDidUpdate() {
    console.log(this.props);
    if (
      !this.state.isLoaded &&
      this.props.book &&
      parseInt(this.props.book.id.toString()) === this.props.id
    ) {
      this.setState({ isLoaded: true });
      this.props.setTitle(this.props.book.title);
    }
  }

  componentWillMount() {}

  componentWillUnmount() {
    this.setState({ isLoaded: false });
  }
  render() {
    return (
      <Container fluid={true}>
        {this.state.isLoaded && (
          <Row>
            <Col md={{ size: 4 }}>
              <img
                className={"img-fluid"}
                src={this.props.book.image}
                alt={"Book cover"}
              />
            </Col>
            <Col md={{ size: 4 }}>
              <h3>{this.props.book.title}</h3>
              {this.props.book.authors.map(author => (
                <h4 key={author}>{author}</h4>
              ))}
              <p>{this.props.book.rating}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.book.review_widget
                }}
              />
            </Col>
          </Row>
        )}
        {!this.state.isLoaded && <Loading />}
      </Container>
    );
  }
}

function mapStateToProps(state: any, ownProps: OwnProps): StateProps {
  return {
    book: state.books[ownProps.id]
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: OwnProps
): DispatchProps {
  return {
    loadBook: (id: number) => dispatch(loadBook(id))
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(BookDetail);
