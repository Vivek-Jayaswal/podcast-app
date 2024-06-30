import "./button.scss"

const Button = ({text, onClick,disabled}) => {
    return(
        <>
            <button className="btn" disabled={disabled} onClick={onClick}>{text}</button>
        </>
    )
}
export default Button;

// export const FlagButton = () => {
    
// }