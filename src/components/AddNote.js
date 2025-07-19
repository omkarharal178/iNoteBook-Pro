import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
  const { addNote } = useContext(noteContext);


  const [note, setNote] = useState({ title: "", description: "", tag: "defaulte" });

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
    <div className='container my-3'>
      <h2>Add a Note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor='title'className='form-label'>Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} placeholder="Title" minLength={5} required  />
        </div>
        <div className="mb-3">
           <label htmlFor='title'className='form-label'>Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} placeholder="Description"  minLength={5} required />
        </div>
         <div className="mb-3">
           <label htmlFor='title'className='form-label'>Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.description} onChange={onChange} placeholder="Tag" />
        </div>

        <button disabled={note.title.length<5 || note.description.length<5  } type="button" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  );
}

export default AddNote;
