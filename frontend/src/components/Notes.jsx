import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

function Notes(props){

    function handleClick(){
        props.onDelete(props.id);
    }

    function editClick(){
        props.onEdit(props.id);
    }

    return(
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <div id="delete" style={{border:"1px solid black"}}><DeleteIcon style={{backgroundColor:"#fff", fontSize : 31}} onClick={handleClick}/></div>
            <div id="edit" style={{border:"1px solid black"}}><EditNoteIcon style={{border:"fff", backgroundColor:"#fff", fontSize : 31}} onClick={editClick}/></div>
        </div>
    );
}

export default Notes;