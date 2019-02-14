import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddFolder extends Component {

    state = { 
        name: '',
        nameValid: false,
        validationMessages: ''
    }

    setFolder= (folderName) => {   
        this.setState({name: folderName}, () => this.validateName(folderName))
        console.log(this.state.name);
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

    postAFolder(e) {
        e.preventDefault();
        const folder = {
            name: this.state.name
        }

        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
        .then(res => res.json())
        .then(resjson => {
            console.log(resjson)
            this.props.addFolderToState(resjson)
            this.props.history.push(`/folders/${resjson.id}`)
        });
    }

    render(){
        const validationMessages = this.state.validationMessages;
        const validName = this.state.nameValid
        return(
            <div>
                <form onSubmit={(e)=>this.postAFolder(e)}>
                    <label value='name' htmlFor='folderName'>Name
                        { !validName && (
                            <p>{validationMessages}</p>
                        )}
                    </label>
                    <input type='text' placeholder='Type a Folder Name' name='folderName'
                    onChange={(e)=>this.setFolder(e.target.value)} />
                    <button>Submit</button>
                    
                </form>
            </div>
        );
    }

}

AddFolder.propTypes = {
    name: PropTypes.string.isRequired
}

export default AddFolder