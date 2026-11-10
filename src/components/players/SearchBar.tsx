import type { SearchBarProps } from "../../types/types";

function SearchBar({searchText, changeHandler} : SearchBarProps){

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        changeHandler(e.target.value)
    }

    return (
            <input type="search" className="p-3 text-lg sm:text-base w-60 h-10 border-1 rounded-md" placeholder="Search players..." onChange={handleChange} value={searchText} aria-label="Search Players"/>
    )
}
export default SearchBar;