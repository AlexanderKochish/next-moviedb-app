import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchMovie = () => {
  const [name, setName] = useState("");
  function handleSubmit(e) {
    setName(e.target.value).toLowerCase().trim();
  }
  return (
    <div className="flex items-center m-1 md:ml-10">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type={"text"}
          placeholder="Search..."
          className="text-white sm:border-b  border-white bg-transparent px-2 py-1 outline-none w-28 sm:w-36"
        />
        <Link href={`/search/${name}`}>
          <button className="p-3 rounded-[50px] bg-rose-600">
            <FaSearch />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchMovie;
