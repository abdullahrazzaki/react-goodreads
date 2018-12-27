import React, { Component } from "react";
import "./App.css";
import Header from "../Header";
import { Container, Row } from "reactstrap";
import { Route } from "react-router-dom";
import SearchBooks from "../SearchBooks";
import SearchResult from "../SearchResult";
import BookDetail from "../BookDetail";
import { connect } from "react-redux";

export interface Props {
  isHome: boolean;
}
type State = {
  title: string;
};
class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setTitle = this.setTitle.bind(this);
    this.state = { title: "GoodReads" };
  }
  setTitle(title: string) {
    this.setState({ title: title });
  }
  render() {
    const { isHome } = this.props;
    const { title } = this.state;
    return (
      <div className="App">
        <main>
          <div>
            <Header isHome={isHome} title={title} />
            <Container fluid={true}>
              <Row className={"mt-3"}>
                <Route
                  path="/"
                  exact
                  render={props => {
                    return <SearchBooks setTitle={this.setTitle} />;
                  }}
                />
                <Route
                  path="/search/:query"
                  render={({ match }) => {
                    const key = match.params.query;
                    return (
                      <SearchResult setTitle={this.setTitle} keyword={key} />
                    );
                  }}
                />
                <Route
                  path="/book/:id"
                  render={({ match }) => {
                    const key = match.params.id;
                    return (
                      <BookDetail setTitle={this.setTitle} id={parseInt(key)} />
                    );
                  }}
                />
              </Row>
            </Container>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isHome: state.router.location.pathname === "/"
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
