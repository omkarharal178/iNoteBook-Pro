import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NotesItem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note ,updatenote} = props;
    return (
        <div className='col-md-3'>
            {/* <h3>{note.title}</h3>
            <p>{note.description}</p> */}
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex aline-item-center'>
                        <h5 className="card-title"> {note.title}</h5>
                        <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfuly","success")}} ></i>
                        <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updatenote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}


export default NotesItem
