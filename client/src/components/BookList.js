import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList(params) {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState();

  return (
    <div>
      <ul id="book-list">
        {loading && <p>Loading...</p>}
        {error && <p>Error : {error.message}</p>}
        {data &&
          data?.books.map((book) => (
            <li onClick={() => setSelected(book.id)} key={book.id}>
              {book.name}
            </li>
          ))}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
