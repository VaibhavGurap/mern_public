import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    book_name: "",
    isbn: "",
    book_title: "",
    author_name: "",
    publisher_name: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      book_name: form.book_name,
      isbn: form.isbn,
      book_title: form.book_title,
      author_name: form.author_name,
      publisher_name: form.publisher_name,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div className="p-3">
      <h3>Update Book</h3>
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
          <input
            type="submit"
            value="Update Book"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
