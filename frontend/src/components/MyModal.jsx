import React,{ useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import DoneIcon from '@mui/icons-material/Done';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function MyModal(props) {
  const [heading ,setHeading] = useState(props.toEdit.headings);
  const [notes, setNotes] = useState(props.toEdit.notes);
  const e_id = props.toEdit.id;
  console.log(heading); 
  console.log(notes);

  async function handleClose(){
    props.toClose();
    props.editedNote({e_id, heading, notes});
  }

  return (
    <div>
      <Modal
        open={props.isOpen}>
        <Box sx={style}>
          <input className='title' onChange={(event) => setHeading(event.target.value)} value={heading} name='heading'>
           </input>
          <textarea className='content' onChange={(event) => setNotes(event.target.value)} value={notes} name='notes'>
           </textarea>
          <Fab
           onClick={handleClose}
           style={{float : "right", backgroundColor : "blueviolet"}}><DoneIcon style={{color: 'white', fontSize: 35}} /></Fab>
        </Box>
        
      </Modal>
    </div>
  );
}

export default MyModal;