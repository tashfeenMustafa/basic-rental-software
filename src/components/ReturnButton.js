function ReturnButton(props) {
    let handleClick = (e) => {
        e.preventDefault()
        props.onReturn()
    }

    return (
        <button onClick={handleClick}>Return</button>
    )
}

export default ReturnButton