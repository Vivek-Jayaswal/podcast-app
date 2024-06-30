import CreatePodcastForm from "../commo-components/StartAPodcastForm/CreaatePodcastForm";
import Header from "../commo-components/header/header";

const CreatePodcast = () => {
    return (
        <div >
            <Header />
            <div className="input-wrapper">
                <h1>Create A Podcast</h1>
                <CreatePodcastForm />
            </div>
        </div>
    )
}
export default CreatePodcast;