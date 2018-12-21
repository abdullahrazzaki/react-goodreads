import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import {Container, Row} from 'reactstrap';
import {Route} from "react-router-dom";
import SearchBooks from "./SearchBooks";
import SearchResult from "./SearchResult";
import BookDetail from "./BookDetail";
import {connect} from "react-redux"
import {changeTitle} from "./actions";
import {ConnectedRouter} from 'connected-react-router'

class App extends Component {
    componentDidUpdate() {
        console.log(this.props);
    }
    render() {
        const setTitle = this.props.setTitle;//.setState({title: title});
        return (
            <div className="App">
                <main>
                    <ConnectedRouter history={this.props.history}>
                        <div>
                            <Header isHome={this.props.isHome} title={this.props.title}/>
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
                    </ConnectedRouter>
                </main>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTitle: (title) => {
            dispatch(changeTitle(title))
        }
    }
};
const mapStateToProps = (state, ownProps) => {
    console.log("State", state);
    let {
        isHome, title
    } = state.navigation;
    return {ownProps, isHome: isHome, title: title};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);