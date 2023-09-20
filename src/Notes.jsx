import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "./Context/Small Notes/noteContext";

import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Notes = ({ text }) => {
  let navigate = useNavigate();
  const note = useContext(NoteContext);
  const { notes, deleteNote, getAllNotes, editNote } = note;
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef();
  const refClose = useRef();
  const [unote, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    ref.current.click();
  };

  const handleClick = (e) => {
    console.log("note updated", unote);
    editNote(unote.id, unote.etitle, unote.edescription, unote.etag);
    refClose.current.click();
    setTimeout(() => {
      alert("Note is updated");
    }, 300);
  };
  const onChange = (e) => {
    setNote({ ...unote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="title"
                    className="form-label"
                    style={{ color: text }}
                  >
                    Note Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={unote.etitle}
                    onChange={onChange}
                    aria-describedby="etitle"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label"
                    style={{ color: text }}
                  >
                    Description
                  </label>
                  <textarea
                    id="estory"
                    name="edescription"
                    value={unote.edescription}
                    rows="5"
                    cols="33"
                    onChange={onChange}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="tag"
                    className="form-label"
                    style={{ color: text }}
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChange}
                    id="etag"
                    name="etag"
                    value={note.etag}
                    aria-describedby="etag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 mx-3">
        <h1 style={{ color: text }}>Your Notes</h1>
        <div className="container mx-3">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((i) => {
          return (
            <div
              key={i._id}
              className="card mx-3 my-2 "
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">{i.title}</h5>
                <p className="card-text">{i.description}</p>
                <p>{i.tag}</p>
                <FaEdit className="mx-3" onClick={() => updateNote(i)}></FaEdit>
                <FaTrash
                  onClick={() => {
                    deleteNote(i._id);
                  }}
                ></FaTrash>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
