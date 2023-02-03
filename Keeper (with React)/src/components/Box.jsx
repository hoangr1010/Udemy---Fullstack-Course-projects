import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';




function Box(props) {

    const [note, changeNote] = useState({title: '',content: ''})
    const [isZoom, changeZoom] = useState(false)

    function updateNote(event) {
        var {name, value} = event.target

        changeNote(preItem => {
            return {
                ...preItem,
                [name]: value
            }
        })
    }

    function openBox() {
        changeZoom(true)
    }

    return (
        <div>
            <form className="create-note">
                <input style={{display: isZoom ? 'inline-block' : 'none'}} onChange={updateNote} name="title" placeholder="Title" value={note.title} />
                <textarea onClick={isZoom ? 'none' : openBox} onChange={updateNote} name="content" placeholder="Take a note..." rows={isZoom ? '3' : '1' } value={note.content} />
                    <Zoom in={isZoom}>
                        <Fab
                            type='button' 
                            onClick={() => {
                                props.onClick(note)
                                changeNote({title: '',content: ''}) 
                                }}
                        ><AddIcon /></Fab>   
                    </Zoom>         
            </form>
        </div>
    )
}

export default Box