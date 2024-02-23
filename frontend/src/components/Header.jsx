import React from "react";
import NotesIcon from '@mui/icons-material/Notes';

function Header(){
    return (
        <header>
           <h1>Keep Notes <NotesIcon style={{color: "white"}}/></h1>
        </header>
    );
}

export default Header;