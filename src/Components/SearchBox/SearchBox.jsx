import { IoSearch } from "react-icons/io5";


const SearchBox = () => {
    return (
        <div className="w-full h-[auto] border rounded-md bg-[#f1f1f1] relative overflow-hidden">
            <IoSearch className="absolute top-[12px] left-[10px] z-50 pointer-events-none opacity-80" />
            <input type="text" className="w-full h-[40px] px-1 pl-8 border border-[rgba(0,0,0,0.1)] bg-[#f1f1f1] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md text-[14px]" placeholder="search here" />
        </div>
    );
};

export default SearchBox;