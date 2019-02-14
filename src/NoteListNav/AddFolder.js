import React, {Component} from 'react'

class AddFolder extends Component {

state = { folder:
    { name: '',
    }  
}

setFolder= (folder) => {
    console.log(folder);
    this.setState({folder})
}
    postAFolder(e) {
        e.preventDefault();
        const folder = this.state.folder
        fetch(`http://localhost:9090/folders/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
        .then(res => res.json())
        // .then(resjson => console.log(resjson));
        .then(resjson => this.props.addFolderToState(resjson.id, this.state.folder.name));
    }

    render(){
        return(
            <div>
                <form onSubmit={(e)=>this.postAFolder(e)}>
                    <label value='name' htmlFor='folderName'>Name</label>
                    <input type='text' placeholder='Type a Folder Name' 
                    onChange={(e)=>this.setFolder(e.target.value)} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }

}

export default AddFolder