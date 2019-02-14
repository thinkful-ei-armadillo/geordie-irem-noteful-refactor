import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AddNote extends Component {
    state ={ 
        name: '',
        nameValid: false,
        validationMessage: '',
        folderId: '',
        content: '',
        modified: new Date()
    }

    setName = (noteName) => {
        this.setState({name: noteName});
    }

    setContent = (content) => {
        this.setState({content: content});
    }

    setFolder = (id) => {
        this.setState({folderId: id})
    }

    validateName = name => {
        let validationMessage = this.state.validationMessages;
        let nameValid = true;
        name = name.replace(/[\s-]/g, '');
        console.log('validator running');
        if(name.length === 0){
            validationMessage = 'Folder must contatin characters!';
            nameValid = false;
            console.log('IMHERE')
        }
        this.setState({
            validationMessages: validationMessage, 
            nameValid
        });
    }

    postANote(e) {
        e.preventDefault();
        const note = {
            name: this.state.name,
            content: this.state.content,
            modified: this.state.modified,
            folderId: this.state.folderId
        }

        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(res => res.json())
        .then(resjson => {
            console.log(resjson)
            this.props.addNoteToState(resjson)
            this.props.history.push(`/notes/${resjson.id}`)
        });
    }

    render(){
        const folders = this.props.folders;
        const validationMessages = this.state.validationMessages;
        const validName = this.state.nameValid
        return(
            <div>
                <form onSubmit={(e)=>this.postANote(e)}>
                    <label value='name' htmlFor='noteName'>Name
                        { !validName && (
                            <p>{validationMessages}</p>
                        )}
                    </label>
                    <input type='text' placeholder='Type a Note Name' name='noteName'
                    onChange={(e)=>this.setName(e.target.value)} />
                    <label value='content' htmlFor='noteContent'>Content
                    </label>
                    <input type='text' placeholder='Type Note Content' name='noteContent'
                    onChange={(e)=>this.setContent(e.target.value)} />
                    <select onChange={(e) => this.setFolder(e.target.value)}>
                        {folders.map(folder => (<option value={folder.id} key={folder.id}>{folder.name}</option>))}
                    </select>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

AddNote.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.string
}