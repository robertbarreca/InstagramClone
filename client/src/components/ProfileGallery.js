/**
 * @file ProfileGallery Component
 * 
 * @description 
 * Renders the photo gallery for a user's profile. Displays the user's posts as images,
 * sourced from the `influencerInfo` prop.
 * 
 * @param - influencerInfo - object that contains the info to display the photos
 */

const ProfileGallery = ({ influencerInfo }) => {
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