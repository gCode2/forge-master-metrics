import type { SearchBarProps } from "../../types/types";

function SearchBar({searchText, changeHandler}: SearchBarProps) {

    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        changeHandler(e.target.value);
    }

    return (
        <div className="relative w-60">
            <input
                type="search"
                className="w-full h-10 pl-3 pr-10 text-lg sm:text-base border rounded-md"
                placeholder="Search players..."
                onChange={handleChange}
                value={searchText}
            />

            {searchText.length > 0 && (
                <button
                    type="button"
                    onClick={() => changeHandler("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2
                               flex items-center justify-center
                               w-7 h-7 rounded-full
                               text-gray-900 cursor-pointer
                               hover:bg-gray-200 active:bg-gray-300"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default SearchBar;