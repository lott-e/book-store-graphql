import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  return (
    <div id="book-details">
      {data ? (
        <>
          <h2>{data?.book?.name}</h2>
          <h3>{data.book.author.name}</h3>
          <p>All books by this author</p>

          <ul className="other-books">
            {data.book.author.books.map((book) => (
              <li>{book.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>No books by this author</p>
        </>
      )}
    </div>
  );
}

export default BookDetails;
