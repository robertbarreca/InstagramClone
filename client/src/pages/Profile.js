const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-header-container">
                <div>
                    <img className="profilePic" alt="profile pic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                </div>
                <div>
                    <h4>John Doe</h4>
                    <div className="profile-info-container">
                        <h5>40 Posts</h5>
                        <h5>14 Followers</h5>
                        <h5>56 Following</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img alt="galleryItem" className="galleryItem" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                <img alt="galleryItem" className="galleryItem" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                <img alt="galleryItem" className="galleryItem" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                <img alt="galleryItem" className="galleryItem" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                <img alt="galleryItem" className="galleryItem" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                <img alt="galleryItem" className="galleryItem" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
            </div>
        </div>
    )
}

export default Profile