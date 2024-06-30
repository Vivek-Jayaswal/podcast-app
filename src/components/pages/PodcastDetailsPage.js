import { useNavigate, useParams } from "react-router-dom";
import Header from "../commo-components/header/header";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import "../commo-components/PodcastCard/podcastcard.scss"



const PodcastDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [podcast , setPodcast] = useState({})
    useEffect(() => {
        getData();
    }, [id])

    const getData = async () => {

        try {
            const docRef = doc(db, "podcasts", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPodcast({ id: id, ...docSnap.data() });
                toast.success("Podcast Found!");
            }
            else {
                toast.error("Podcast Not Found!")
                navigate("/podcasts")
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <Header />
            <div className="input-wrapper p">
                {
                    podcast.id && (
                        <>
                            <h1 className="podcast-title">Title</h1>
                            <div className="banner-wrapper">
                                <img src={podcast.bannerImage} />
                            </div>
                            <p className="podcast-description">{podcast.description}</p>
                            <p className="podcast-title-heading">Episode</p>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default PodcastDetailsPage;