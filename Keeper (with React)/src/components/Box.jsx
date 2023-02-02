import React, { useState } from 'react';

function Box(props) {

    const [note, changeNote] = useState({title: '',content: ''})

    function updateNote(event) {
        var {name, value} = event.target

        changeNote(preItem => {
            return {
                ...preItem,
                [name]: value
            }
        })
    }

    return (
        <div>
            <form>
                <input onChange={updateNote} name="title" placeholder="Title" value={note.title} />
                <textarea onChange={updateNote} name="content" placeholder="Take a note..." rows="3" value={note.content} />
                <button 
                    type='button' 
                    onClick={() => {
                        props.onClick(note)
                        changeNote({title: '',content: ''}) 
                        }}
                >Add</button>            
            </form>
        </div>
    )
}

export default Box