import { Link } from "react-router-dom";
import "./podcastcard.scss"

const PodcastCard = ({ id, title, imageUrl , key }) => {
    return (

        <Link to={`/podcast/${id}`}>
            <div className="podcast-card">
                <img src={imageUrl} className="podcast-image"/>
                <p className="podcast-title">{title}</p>
            </div>
        </Link>
    )
}
export default PodcastCard;