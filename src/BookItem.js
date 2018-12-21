import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'reactstrap';
import Book from './Book';
import {connect} from 'react-redux';
import {selectBook} from "./actions";

class BookItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.selectBook(this.props.book.id);
    }

    render() {
        let book = this.props.book;
        return (
            <div onClick={this.onClick}>
                <Card className="mt-3">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                </Card>
            </div>
        );
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        selectBook: (id) => dispatch(selectBook(id))
    }
};
BookItem.propTypes =
    {
        book: PropTypes.instanceOf(Book).isRequired
    };
export default connect(null, mapDispatchToProps)(BookItem);
