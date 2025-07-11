function Button({handleChange, Children}){
    return(
        <button onClick={handleChange}>{!Children ? 'submit' : Children}</button>
    )
}

export default Button;