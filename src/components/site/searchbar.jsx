import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchArticles } from "../../store/features/articles-slice";
import { sources } from "../../utils/constants";

export default function SearchBar() {
  const [localKeyword, setLocalKeyword] = useState("");
  const dispatch = useDispatch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchArticles({
        filters: { q: localKeyword },
        sources: sources,
      })
    );
    setLocalKeyword("");
  };

  return (
    <form onSubmit={handleSearchSubmit} className="py-2">
      <label className="text-gray-700 font-bold mb-2 block">
        Keyword Search
        <div className="flex border mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input
            type="text"
            name="keyword"
            placeholder="Keyword search..."
            className="w-full px-3 py-2"
            value={localKeyword}
            onChange={(e) => setLocalKeyword(e.target.value)}
          />
          <button
            className="px-8 border-l bg-blue-500 text-white rounded-r-md"
            type="submit"
          >
            Search
          </button>
        </div>
      </label>
    </form>
  );
}
