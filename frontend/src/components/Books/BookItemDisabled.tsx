import { BookItemData } from "../../config/api/books/books.types";
import BookItemCompressed from "./BookItemCompressed";

type Props = {
  book: BookItemData;
};

const BookItemDisabled: React.FC<Props> = (props) => {
  return (
    <BookItemCompressed
      book={props.book}
      containerSx={{ opacity: "0.7", cursor: "default" }}
      onClick={() => null}
      animate={false}
    />
  );
};

export default BookItemDisabled;
