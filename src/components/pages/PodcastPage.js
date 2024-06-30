import Header from "../commo-components/header/header.js"
import { collection, query, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPodcasts } from "../../slices/podcastSlice.js";
import PodcastCard from "../commo-components/PodcastCard/PodcastCard.js";
import "../commo-components/PodcastCard/podcastcard.scss";
import InputComponent from "../commo-components/Input/input.js";
import "../commo-components/header/header.scss"

const PodcastPage = () => {

    const [search, setSearch] = useState("")
    const podcasts = useSelector(state => state.podcasts.podcasts);
    console.log(podcasts);
    const dispatch = useDispatch();


    useEffect(() => {
        const unSubscribe = onSnapshot(query(collection(db, "podcasts")),
            (quearySnapShot) => {
                const podcastsData = [];
                quearySnapShot.forEach(doc => {
                    podcastsData.push({ id: doc.id, ...doc.data() });
                });
                dispatch(setPodcasts(podcastsData));
            },
            (error) => {
                console.log("error fetching user data ", error);
            }
        );
        return () => {
            unSubscribe();
        }
    }, [dispatch]);

    const filterdPodcast = podcasts.filter((item) => {
        return item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    })

    return (
        <>
            <Header />
            <div className="input-wrapper">
                <InputComponent
                    type={"text"}
                    value={search}
                    setState={setSearch}
                    placeholder={"Search By title"}
                />

                <div className="input-wrapper" style={{ marginTop: "2rem" }}>
                    <h1>Podcast Page</h1>
                    <div className="podcast-flex">
                        {
                            filterdPodcast.length > 0 ? filterdPodcast.map((item) => {
                                return (

                                    <PodcastCard title={item.title} imageUrl={item.displayImage} id={item.id} key={item.id} />
                                )
                            }) :
                                <div>
                                    {
                                        search ? <h1>podcast not found</h1> : <h1>podcast not available</h1>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default PodcastPage;

