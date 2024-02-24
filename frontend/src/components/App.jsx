import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WritingArea from "./WritingArea";
import Notes from "./Notes";
import MyModal from "./MyModal";
import axios from "axios";

function App(){
   
    const [entry, setEntry] = useState([]);
    const [editEntry, setEditEntry] = useState();
    const [isModalOpen, setModalOpen] = useState(false);

    async function getNotes(){
        try{
            const entries = await axios.get('https://keep-notes-env.eba-462p5p2r.us-east-1.elasticbeanstalk.com/getnotes');
            const parsedEntries = entries.data;
            console.log(parsedEntries);
            setEntry(parsedEntries);
        } catch(err){
            console.error(err.message);
        }
    }
    
    useEffect(()=>{
        getNotes();
    }, []);
          
    function addEntry(ent){
        setEntry((prevValue) => {
           return [...prevValue, ent];
        });
        getNotes();
    }

    async function deleteEntry(id){
        setEntry( (prevValue) => {
            return prevValue.filter((entry) => {
                return entry.id !== id;
            });
        });
       try {
        await axios.post('https://keep-notes-env.eba-462p5p2r.us-east-1.elasticbeanstalk.com/deletenote', {id});
       } catch (err){
        console.error(err.message);
       }
       getNotes();       
    }
    
    async function editEntryId(id){
        try{
            setEditEntry(entry.find(note => note.id === id)); 
            setModalOpen(true);
            console.log(editEntry);
         } catch(err){
            console.log(err.message);
        }
    }

    async function handleEdit(newNote){
        try {
            // console.log(`This is in the handleEdit function ${newNote.heading} ${editEntry}`);
            const {heading, notes} = newNote; // these names should be same as what were passed into here in the object from child. recall, names of fields of objects should be same
            const e_id = editEntry.id;
            console.log(`This is in handleEdit ${heading} ${notes} ${e_id}`)
            await axios.post('https://keep-notes-env.eba-462p5p2r.us-east-1.elasticbeanstalk.com/editnote', {heading, notes, e_id});
  
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <Header />
            <WritingArea onAdd={addEntry}/>
            {isModalOpen && <MyModal 
            toEdit={editEntry} isOpen={isModalOpen} toClose={()=>setModalOpen(false)}
            editedNote={handleEdit}
            />}
            {entry.map((note, index) => {
                return (
                    <Notes key={index}
                    id={note.id}
                    title={note.headings}
                    content={note.notes}
                    onDelete={deleteEntry}
                    onEdit={editEntryId}
                />
                )
                })
            }
            <Footer />
        </div>
    );
}

export default App;
