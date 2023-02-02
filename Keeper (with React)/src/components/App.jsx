import React, { useState } from 'react';
import Header from './Header'
import Footer from './Footer';
import Note from './Note';
import Box from './Box'


function App() {

    const [notes, updateNote] = useState([])

    function addItem(noteObject) {
        // add item to notes array
        console.log(noteObject)

        updateNote(preItems => {
            return [...preItems, noteObject]
        })
    }

    function deleteItem(id) {
        updateNote(preItems => {
            return notes.filter((note, index) => index!==id)
        })
        console.log(notes)
    }

    return <div>
        <Header />
        <Box onClick={addItem}/>
        {notes.map((note, index) =>
        <Note 
            key={index} 
            id={index} 
            title={note.title} 
            content={note.content}
            delete={deleteItem} />
        )}
        <Footer />
    </div>
}

export default App