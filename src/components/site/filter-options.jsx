import { useState } from "react";
import { PanelTopClose, PanelBottomClose } from "lucide-react";
import { useDispatch } from "react-redux";
import { availableCategories, sources } from "../../utils/constants";
import { fetchArticles } from "../../store/features/articles-slice";
import { getTodayFormatted } from "../../utils";

export default function FilterOptions() {
  const [moreOptions, setMoreOptions] = useState(false);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    category: "",
    from: getTodayFormatted(),
    to: "",
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "category") {
        setFilters((prev) => {
          const newCategories = checked
            ? [...prev.category, value]
            : prev.category.filter((cat) => cat !== value);
          return { ...prev, category: newCategories };
        });
      }
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const applyFilter = () => {
    dispatch(
      fetchArticles({
        filters: {
          category: filters.category,
          from: filters.from,
          to: filters.to,
        },
        sources: sources,
      })
    );
    resetFilter();
  };
  const resetFilter = () => {
    setFilters({
      category: [],
      from: getTodayFormatted(),
      to: "",
    });
  };

  return (
    <section>
      <button
        className="flex items-center gap-2 pb-3"
        onClick={() => setMoreOptions(!moreOptions)}
      >
        {moreOptions ? <PanelTopClose /> : <PanelBottomClose />}
        <span className="text-gray-700 font-bold">
          {moreOptions ? "Hide Options" : "View Options"}
        </span>
      </button>
      {moreOptions && (
        <>
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label className="text-gray-700 font-bold mb-2 block">
                Start Date
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.from}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
            <div className="flex-1">
              <label className="text-gray-700 font-bold mb-2 block">
                End Date
                <input
                  type="date"
                  name="dateTo"
                  value={filters.to}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-gray-700 font-bold mb-2">News Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableCategories.map((category) => (
                <label key={category} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={filters.category.includes(category)}
                    onChange={handleFilterChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 capitalize">
                    {category.replaceAll("-", " ")}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-5">
            <button
              onClick={applyFilter}
              className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilter}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </>
      )}
    </section>
  );
}
