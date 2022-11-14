import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    book_name: "",
    isbn: "",
    book_title: "",
    author_name: "",
    publisher_name: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      book_name: "",
      isbn: "",
      book_title: "",
      author_name: "",
      publisher_name: "",
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className="p-5">
      <h3>Add New Book</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Book Name</label>
          <input
            type="text"
            className="form-control"
            id="book_name"
            value={form.book_name}
            onChange={(e) => updateForm({ book_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">ISBN No</label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            value={form.isbn}
            onChange={(e) => updateForm({ isbn: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Book Title</label>
          <input
            type="text"
            className="form-control"
            id="book_title"
            value={form.book_title}
            onChange={(e) => updateForm({ book_title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Author Name</label>
          <input
            type="text"
            className="form-control"
            id="author_name"
            value={form.author_name}
            onChange={(e) => updateForm({ author_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Publisher Name:</label>
          <input
            type="text"
            className="form-control"
            id="publisher_name"
            value={form.publisher_name}
            onChange={(e) => updateForm({ publisher_name: e.target.value })}
          />
        </div>
        <div className="form-group mt-3">
          <input type="submit" value="Add Book" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
