const ProfileGallery = ({influencerInfo}) => {
    return (
        <div className="gallery">
                        {influencerInfo.posts.map((post) => (
                            <img
                                alt={post.title}
                                className="galleryItem"
                                src={post.photo}
                                key={post._id}
                            />
                        ))}
                    </div>
    )
}

export default ProfileGallery