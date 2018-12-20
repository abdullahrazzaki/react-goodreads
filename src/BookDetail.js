import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'reactstrap';

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.book = false;
        this.state = {isLoaded: false}
    }

    componentWillMount() {
        const loaded = (book) => {
            console.log("jnl", book);
            this.props.setTitle(book.title);
            this.setState({isLoaded: true, book: book});
        };
        this.fetchBook("/book?id=" + this.props.id).then(function (data) {
            console.log(data);
//            setState({book: data});
            console.log(data.review_widget);
            loaded(data);
            //          this.props.setTitle(data.title);
            console.log("ftat");
            //        setState({isLoaded:true});
        });
    }

    fetchBook(url) {
        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(
                    function (response) {
                        console.log(response);
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        // Examine the text in the response
                        response.json().then(function (data) {
                            console.log("xt");
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
                {
                    this.state.isLoaded &&
                    <Row>
                        <Col md={{size: 4}}>
                            <img className={"img-fluid"} src={this.state.book.image} alt={"Book cover"}/>
                        </Col>
                        <Col md={{size: 4}}>
                            <h3>{this.state.book.title}</h3>
                            {this.state.book.authors.map((author) => <h4 key={author}>{author}</h4>)}
                            <p>{this.state.book.rating}</p>
                            <div dangerouslySetInnerHTML={{__html: this.state.book.review_widget}}>
                            </div>
                        </Col>
                    </Row>
                }
            </Container>
        );
    }
}

BookDetail.propTypes = {
    setTitle: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
};

export default BookDetail;