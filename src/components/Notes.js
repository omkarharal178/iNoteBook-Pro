
import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const { notes, getNote, editNote } = useContext(noteContext);

    const navigator = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('token')) {

            getNote();
        }
        else {
            navigator('/login')
        }
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null)

    const refClose = useRef(null)

    const updatenote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });


    }
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const handleClick = (e) => {
        console.log("Udating note ..........", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfuly", "success")


    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* modal */}

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor='etitle' className='form-label'>Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} placeholder="Title" minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='edescription' className='form-label'>Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} placeholder="Description" minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='etag' className='form-label'>Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} placeholder="Tag" />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Udate Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h2>Your Notes</h2>
                {notes.length === 0 && <p>No Note to Display</p>}
                {notes.map((note) => {
                    return (

                        <NotesItem key={note._id} updatenote={updatenote} note={note} showAlert={props.showAlert} />

                    )
                })}
            </div>
        </>
    )
}

export default Notes
