import "./input.scss"

const InputComponent = ({type,value,setState,placeholder,required,}) => {

    return (
        <input
            type={type}
            value={value}
            onChange={(e) => { setState(e.target.value) }}
            placeholder={placeholder}
            required={required}
            className="custom-input"
        />
    )
}

export default InputComponent;