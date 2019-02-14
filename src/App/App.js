import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
// import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import NotesContext from '../NotesContext';
import { findNote } from '../notes-helpers'
import './App.css';
import AddFolder from '../NoteListNav/AddFolder';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  getFolders() {
    fetch('http://localhost:9090/folders')
    .then(res => res.json())
    .then(resjson => this.setState({folders: resjson}))
  }

  getNotes() {
    fetch('http://localhost:9090/notes')
    .then(res =>res.json())
    .then(resjson => this.setState({notes: resjson}))
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({notes: newNotes})
  }

  addFolderToState = (folder) =>{
    this.setState({
      folders: [...this.state.folders], 
      folder});
  }

 

  componentDidMount() {
    // fake date loading from API call
    // setTimeout(() => this.setState(dummyStore), 600)
    //fetch 1)folders and 2) notes
    this.getFolders()
    this.getNotes()
  }

  renderNavRoutes() {
    // const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            // render={routeProps =>
            //   <NotegetNav
            //     folders={folders}
            //     notes={notes}
            //     {...routeProps}
            //   />
            // }
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:noteId'
          // render={routeProps => {
          //   const { noteId } = routeProps.match.params
          //   const note = findNote(notes, noteId) || {}
          //   const folder = findFolder(folders, note.folderId)
          //   return (
          //     <NotePageNav
          //       {...routeProps}
          //       folder={folder}
          //     />
          //   )
          // }}
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          render ={(routeProps) => <AddFolder addFolderToState={this.addFolderToState} {...routeProps} />}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    const { notes } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            // render={routeProps => {
            //   const { folderId } = routeProps.match.params
            //   const notesForFolder = getNotesForFolder(notes, folderId)
            //   return (
            //     <NoteListMain
            //       {...routeProps}
            //       notes={notesForFolder}
            //     />
            //   )
            // }}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }}
        />
        {/* <Route
          path='/add-folder'
          component={AddFolder}
        /> */}
        <Route
          path='/add-note'
          // render={routeProps => {
          //   return (
          //     <AddNote
          //       {...routeProps}
          //       folders={folders}
          //     />
          //   )
          // }}
          component={AddNote}
        />
      </>
    )
  }

  render() {

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }

    return (
      <NotesContext.Provider value={contextValue}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </NotesContext.Provider>
    )
  }
}

export default App
