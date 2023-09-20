import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import NoteContext from "./Context/Small Notes/noteContext";
import React from "react";
import Notes from "./Notes";
const Home = ({ text, mode }) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div style={{height:'100%'}}>
      <div className="container my-3 " >
        <h1 style={{ color: text }}>Add a Note</h1>
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
              id="title"
              name="title"
              onChange={onChange}
              aria-describedby="title"
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
              id="story"
              name="description"
              rows="5"
              cols="33"
              onChange={onChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" style={{ color: text }}>
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              id="tag"
              name="tag"
              aria-describedby="tag"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note <FaPlus></FaPlus>
          </button>
        </form>
      </div>
      <Notes text={text}></Notes>
    </div>
  );
};

export default Home;
