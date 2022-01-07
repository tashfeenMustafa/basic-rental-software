function Search(props) { 
    let handleChange = (e) => {
        props.onSearch(e.target.value)
    }
    return (
        <div>
            <label htmlFor="search">Search by name</label>
            <input 
                id="search" 
                type="text" 
                value={props.searchValue} 
                onChange={handleChange} />
        </div>
    );
}

export default Search