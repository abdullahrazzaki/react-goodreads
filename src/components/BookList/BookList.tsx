import React, { Component, ReactElement } from "react";
import { ListGroup } from "reactstrap";
import BookItem from "./BookItem";
import { BookTypes } from "../../types";

class BookList extends Component<Props> {
  trackScrolling = () => {
    const wrappedElement = document.getElementById("bookList");
    if (BookList.isBottom(wrappedElement)) {
      this.props.onEndReached();
    }
  };

  constructor(props: Props) {
    super(props);
    BookList.isBottom = BookList.isBottom.bind(this);
  }

  static isBottom(el: any) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    let { books, onClick } = this.props;
    let items = books.map(book => {
      return <BookItem key={book.id} book={book} onClick={onClick} />;
    });
    return (
      <ListGroup id={"bookList"} className={"mb-5"}>
        {items}
      </ListGroup>
    );
  }

  componentDidMount() {
    if (this.props.notifyOnScrollEnd)
      document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }
}
interface Props {
  books: BookTypes.Book[];
  onEndReached: () => void;
  notifyOnScrollEnd: boolean;
  onClick: (id: number) => void;
}
export default BookList;
