import React, {Component} from 'react';
import {ListGroup} from 'reactstrap';
import BookItem from "./BookItem";
import PropTypes from 'prop-types';
import Book from './Book';

class BookList extends Component {
    trackScrolling = () => {
        const wrappedElement = document.getElementById('bookList');
        if (BookList.isBottom(wrappedElement)) {
            this.props.onEndReached();
            console.log('header bottom reached');
        }
    };

    constructor(props) {
        super(props);
        BookList.isBottom = BookList.isBottom.bind(this);
    }

    static isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    render() {
        console.log("renering list" + this.props.books.length);
        let items = this.props.books.map((book) => {
            return <BookItem key={book.id} book={book}/>
        });
        return (
            <ListGroup id={"bookList"} className={"mb-5"}>
                {items}
            </ListGroup>

        );
    }

    componentDidMount() {
        if (this.props.notifyOnScrollEnd)
            document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
}

BookList.propTypes = {
    books: PropTypes.arrayOf(PropTypes.instanceOf(Book)).isRequired,
    onEndReached: PropTypes.func.isRequired,
    notifyOnScrollEnd: PropTypes.bool.isRequired
};
BookList.defaultProps = {
    books: [],
    notifyOnScrollEnd: false
};
export default BookList;
