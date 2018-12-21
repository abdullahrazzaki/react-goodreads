import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'reactstrap';
import {connect} from 'react-redux';
import Loading from "./Loading";
import {changeTitle, loadBook} from "./actions";

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.book = false;
        this.state = {isLoaded: false};
        this.props.loadBook(this.props.id);
    }

    componentDidUpdate() {
        console.log(this.props.book);
        if (!this.state.isLoaded && this.props.book && this.props.book.id === this.props.bookId) {
            this.setState({isLoaded: true});
            this.props.setTitle(this.props.book.title);
        }
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        this.setState({isLoaded: false});
    }
    render() {
        return (
            <Container fluid={true}>
                {
                    this.state.isLoaded &&
                    <Row>
                        <Col md={{size: 4}}>
                            <img className={"img-fluid"} src={this.props.book.image} alt={"Book cover"}/>
                        </Col>
                        <Col md={{size: 4}}>
                            <h3>{this.props.book.title}</h3>
                            {this.props.book.authors.map((author) => <h4 key={author}>{author}</h4>)}
                            <p>{this.props.book.rating}</p>
                            <div dangerouslySetInnerHTML={{__html: this.props.book.review_widget}}>
                            </div>
                        </Col>
                    </Row>
                }
                {
                    !this.state.isLoaded && <Loading/>
                }
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        book: state.book.selectedBook,
        bookId: state.book.id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setTitle: (title) => {
            dispatch(changeTitle(title))
        },
        loadBook: (id) => dispatch(loadBook(id))
    }
}
BookDetail.propTypes = {
    setTitle: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);