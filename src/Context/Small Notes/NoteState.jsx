import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState=(props)=>{
  const host= "http://localhost:3001";
 //get all notes
 const noteItems=[]
 const [notes,setNotes]=useState(noteItems)
  const getAllNotes=async()=>{
    
    const response = await fetch(`${host}/api/notes/FindAllNotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        'auth-token':sessionStorage.getItem('token')
      },
     
    });
    const data = await response.json();
  if (data.success) {
    setNotes(data.notes);
  }
  };
    
    //Add a note
   const addNote=async(title,description,tag)=>{
    
    const response = await fetch(`${host}/api/notes/addNotes`, {
     
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        'auth-token':sessionStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
   
  const json=await response.json();
  console.log(json)
    console.log("note added")
    
      const note={
        "_id": "643178e8cf7a6522cac6824a",
        "user": "642fe078338c2885d88b991e",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-04-08T14:23:36.354Z",
        "__v": 0

      }
      setNotes(notes.concat(note))
      setTimeout(()=>{
        alert("A new Note is Added");
      },200)
   }
    //delete note
    const deleteNote=async(id)=>{
     

      const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          'auth-token':sessionStorage.getItem('token')
        },
       
       
      });
     const json= response.json
      console.log("deleted id"+id)
      console.log(json)
      const newNote=notes.filter((note)=>{
       return note._id!==id;

      })
      setNotes(newNote)
      setTimeout(()=>{
        alert("Note is Deleted")
      },200)
    }
    //edit note
    const editNote = async (id, title, description, tag) => {
      
     
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':sessionStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
    
      const data = await response.json();
    
      // Log response and data
      console.log(response);
      console.log(data);
      let newNote = JSON.parse(JSON.stringify(notes));
      // Update notes array
      for (let i = 0; i < notes.length; i++) {
        const element = notes[i];
        if (element._id === id) {
          newNote[i].title = title;
          newNote[i].description = description;
          newNote[i].tag = tag;
          break
        }
      
      }
      setNotes(newNote)
    };
    
    
    
   return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,getAllNotes,editNote}}>
     {props.children}
    </NoteContext.Provider>
   )
}
export default NoteState