import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    
    
    //Get all note
    const getNote = async () => {
        //API Call 

        const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
       const json = await response.json();
       
        setNotes(json); 
    }


    //Add note
    const addNote = async (title, description, tag) => {
        //API Call 

        const response = await fetch(`http://localhost:5000/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }),
        });

          const note= await response.json();
          setNotes(notes.concat(note))
        
    };


    //Delete Note

    const deleteNote = async(id) => {

        //API Call

         const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }

        });
       const json = await response.json();
        console.log(json); 


        // console.log("Deleteing the note whith id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    };



    // Edit Note 

    const editNote = async (id, title, description, tag) => {
        
        //API call

        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);
   
      let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];

            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag
                break;
            }

        }
        setNotes(newNotes);
    }


    //  RETURN MUST BE INSIDE FUNCTION!
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNote}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;

