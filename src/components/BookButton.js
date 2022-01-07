function BookButton(props) {
    let handleClick = (e) => {
        e.preventDefault()
        props.onBook()
    }

    return (
        <button onClick={handleClick}>Book</button>
    )
}

export default BookButton