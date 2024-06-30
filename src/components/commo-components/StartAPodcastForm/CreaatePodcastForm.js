import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../Input/input";
import FileInput from "../fileInput/FileInput";
import Button from "../Button/button";
import { toast } from "react-toastify";
import { auth, db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";



const CreatePodcastForm = () => {

    const [title, setTitle] = useState("");
    const [discription, setDescription] = useState("");
    const [displayImage, setDisplayImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (title && discription && displayImage && bannerImage) {
            setLoading(true)
            try {
                // const bannerImageRef = ref(storage, "podcast-bannerImage");
                const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(bannerImageRef, bannerImage);
                const bannerImageURL = await getDownloadURL(bannerImageRef);

                const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(displayImageRef, displayImage);
                const displayImageURL = await getDownloadURL(displayImageRef);

                const podcastData = {
                    title: title,
                    description: discription,
                    bannerImage: bannerImageURL,
                    displayImage: displayImageURL,
                    createdBy: auth.currentUser.uid,
                }

                const docRef = await addDoc(collection(db , "podcasts"),podcastData);


                setTitle("");
                setDescription("");
                setBannerImage(null);
                setDisplayImage(null);
                toast.success("podcast created");
                setLoading(false);

            } catch (e) {
                toast.error(e.message);
                setLoading(false);
            }
        }
        else {
            toast.warning("please fill all details");
            setLoading(false)
        }
    }

    const bannerImageHandle = (file) => {
        setBannerImage(file);
    }
    const displayImageHandle = (file) => {
        setDisplayImage(file)
    }

    return (
        <div className="signup-container">
            <InputComponent
                type="text"
                value={title}
                setState={setTitle}
                placeholder={"Title"}
                required={true}
            />
            <InputComponent
                type="text"
                value={discription}
                setState={setDescription}
                placeholder={"Description"}
                required={true}
            />

            <FileInput
                accept={"image/*"}
                id={"display-image-input"}
                text={"display image upload"}
                fileHandleFnc={displayImageHandle}

            />
            <FileInput
                accept={"image/*"}
                id={"banner-image-input"}
                text={"banner image upload"}
                fileHandleFnc={bannerImageHandle}
            />

            <Button
                text={loading ? "Loading..." : "Create Podcast"}
                disabled={loading}
                onClick={handleSubmit}
            />
        </div>
    )
}
export default CreatePodcastForm;