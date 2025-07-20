import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import './AddNote.css'; // Assuming you have a CSS file for styling

function AddNote(props) {
  const { addNote } = useContext(noteContext);


  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
     props.showAlert(" Add Note Successfuly","success")
  };
 
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
    
    <div className="addnote-container">
            <form className="addnote-form" >
                <h2>Add a New Note</h2>
                <label htmlFor='title' className='form-label'>Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={note.title}
                    onChange={onChange}
                    required
                />
                <label htmlFor='description' className='form-label'>Description</label>
                <textarea
                    name="description"
                    placeholder="Description"
                    rows="4"
                    value={note.description}
                    onChange={onChange}
                    required
                />
                <label htmlFor='tag' className='form-label'>Tag</label>
                <input
                    type="text"
                    name="tag"
                    placeholder="Tag "
                    value={note.tag}
                    onChange={onChange}
                />

                <button type="submit" className="addnote-btn" onClick={handleClick}>Add Note</button>
            </form>
        </div>
        </>
  );
}

export default AddNote;
