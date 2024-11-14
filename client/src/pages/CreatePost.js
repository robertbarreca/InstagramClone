const CreatePost = () => {
    return (
        <div className="card input-filled create-post-card">
            <input type="text" placeholder="title"/>
            <input type="text" placeholder="body" />
            <div className="file-field input-field">
            <div className="btn #64bf56 blue darken-1">
                <span>Upload Image</span>
                <input type="file" />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64bf56 blue darken-1" >
                    Create Post
                </button>
                </div>
    )
}

export default CreatePost