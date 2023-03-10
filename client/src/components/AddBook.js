import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const [form, updateForm] = useState({ name: "", genre: "", authorId: "" });

  const [addBook] = useMutation(addBookMutation);

  const handleChange = (event) => {
    updateForm({ ...form, [event.target.name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    addBook({
      variables: {
        name: form.name,
        genre: form.genre,
        authorId: form.authorId,
      },
    });
    updateForm({ name: "", genre: "", authorId: "" });
  }

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>

        <input
          onChange={handleChange}
          name="name"
          placeholder="name"
          value={form.name}
          type="text"
        />
      </div>
      <div className="field">
        <label>Genre:</label>

        <input
          onChange={handleChange}
          name="genre"
          placeholder="genre"
          value={form.genre}
          type="text"
        />
      </div>
      <div className="field">
        <label>Author:</label>

        <select>
          <option>Select Author</option>
          {data &&
            data?.authors.map((author) => (
              <option key={author.id} value={(form.authorId = author.id)}>
                {author.name}
              </option>
            ))}
        </select>
      </div>
      <button onClick={handleSubmit}>+</button>
    </form>
  );
}

export default AddBook;
