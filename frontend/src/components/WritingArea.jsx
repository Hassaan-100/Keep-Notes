import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const style = {
    backgroundColor : 'blueviolet',
    color: '#fff',
    position: 'absolute',
    right: '18px',
    bottom: '-18px',
    width: '55px',
    height: '55px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 3px 3px 0 rgba(113, 111, 111, 1.5)',
}

axios.defaults.withCredentials = true;

function WritingArea(props){
    const [note, setNote] = useState({
        heading : '',
        notes : ''
    });

    const [isExpanded, setExpanded] = useState(false);

    function handleChange(event){
        const {name, value} = event.target;
        setNote(prevValue => {
            return {
            ...prevValue, [name] : value
            }
        });
    }

    async function addClick(){
        try{
             await axios.post('https://keepnotes.hassaandev.site/addnote', note);
        } catch (err) {
            console.log(err.message)
        }
        props.onAdd(note);
        setNote({
            heading:"",
            notes:"",
        });
    }

    function handleClick(event){
        setExpanded(true);
        event.preventDefault();
    }

    return (
        <div>
            <form className="form-component">
                {isExpanded && <input className="title" name="heading" placeholder="Title" value={note.heading}
                onChange={handleChange} />}
                
                <textarea className="content" name="notes" placeholder="Write your note here" value={note.notes}
                onChange={handleChange} onClick={handleClick}
                rows={isExpanded ? "3" : "1"}>
                </textarea>
                
                <Zoom in={isExpanded === true ? true : false}>
                    <Fab style={style} id="addButton" onClick={addClick}><AddIcon style={{fontSize: 30}}/></Fab>
                 </Zoom>
                 <Zoom in={isExpanded === true ? true : false}>
                    <Fab style={{...style, right: '90px'}} onClick={()=>setExpanded(false)}><CloseIcon style={{fontSize:30}} /></Fab>
                 </Zoom>
            </form>
        </div>
    )
}

export default WritingArea;
