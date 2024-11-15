// import useState from "react"

const PostCard = (props) => {
    console.log(props.post)
    return (
        <div className="card home-card">
            <h5>{props.post.creator.name}</h5>
                <div className="card-image">
                    <img alt={props.post.creator.name + "'s post"} src={props.post.phot}></img>
                </div>
                <div className="card-content">
                    <i className="material-icons heart-icon">favorite</i>
                    <h6>{props.post.title}</h6>
                    <p>{props.post.body}</p>
                    <input type="text" placeholder="add a comment"></input>
                </div>
            </div>
    )
}

export default PostCard