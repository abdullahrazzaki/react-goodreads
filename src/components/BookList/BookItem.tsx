import React from "react";
import { Card } from "reactstrap";
import { BookTypes } from "../../types";
type Props = {
  book: BookTypes.Book;
  onClick: (id: number) => void;
};
const BookItem = (props: Props) => {
  const {
    book: { id, author, title },
    onClick
  } = props;
  return (
    <div onClick={() => onClick(id)}>
      <Card className="mt-3">
        <h3>{title}</h3>
        <p>{author}</p>
      </Card>
    </div>
  );
};
export default BookItem;
