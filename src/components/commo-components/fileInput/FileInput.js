import { useState } from "react";
import "../Input/input.scss"

const FileInput = ({ id, accept, fileHandleFnc , text}) => {

    const [fileSelected, setFileSelected] = useState("")

    const onChange = (e) => {
        console.log(e.target.files);
        setFileSelected(e.target.files[0].name);
        fileHandleFnc(e.target.files[0]);
    }

    return (
        <>
            <label htmlFor={id} className={`custom-input ${!fileSelected ? "lable-input" : "active"}`}>
                {
                    fileSelected ? `the file ${fileSelected} was selected` : text
                }
            </label>
            <input
                type="file"
                accept={accept}
                id={id}
                style={{ display: "none" }}
                onChange={onChange}
            />
        </>
    )
}

export default FileInput;