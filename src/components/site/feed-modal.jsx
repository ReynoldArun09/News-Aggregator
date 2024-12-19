/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import CustomButton from "../common/customButton";
import { availableCategories, sources } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { fetchArticles } from "../../store/features/articles-slice";
import { toast } from "sonner";

export default function FeedModal({ setShowModal }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCategories =
      JSON.parse(sessionStorage.getItem("selectcategories")) || [];
    const savedSources =
      JSON.parse(sessionStorage.getItem("selectsources")) || [];
    setSelectedCategories(savedCategories);
    setSelectedSources(savedSources);
  }, []);

  const closeModal = () => {
    setShowModal(true);
  };
  const savePreferences = () => {
    if (selectedCategories.length > 0 || selectedSources.length > 0) {
      sessionStorage.setItem(
        "selectcategories",
        JSON.stringify(selectedCategories)
      );
      sessionStorage.setItem("selectsources", JSON.stringify(selectedSources));

      dispatch(
        fetchArticles({
          sources: selectedSources,
          filters: {
            category: selectedCategories,
          },
        })
      );
      sessionStorage.setItem("modal-state", true);
      setShowModal(true);
    } else {
      toast.warning("No categories or sources selected.");
    }
  };

  const clearPreferences = () => {
    sessionStorage.removeItem("selectcategories");
    sessionStorage.removeItem("selectsources");
    setSelectedCategories([]);
    setSelectedSources([]);
    closeModal();
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };
  const toggleSource = (source) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((item) => item !== source)
        : [...prev, source]
    );
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="border shadow-lg bg-gray-100">
        <div className="flex justify-between px-6 pt-4">
          <h2 className="font-bold text-4xl">Personalize Your News Feed</h2>
          <button onClick={closeModal}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div className="relative flex-auto p-6">
          <div className="mb-4">
            <h4 className="mb-2 text-lg font-medium">Select News Sources</h4>
            <div className="flex flex-wrap gap-2">
              {sources.map((source) => (
                <button
                  key={source}
                  className={`capitalize px-4 py-2 border rounded ${
                    selectedSources.includes(source)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => toggleSource(source)}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-lg font-medium">Select Categories</h4>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`capitalize px-4 py-2 border rounded ${
                    selectedCategories.includes(category)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="py-5 space-x-5 px-6">
          <CustomButton
            onClick={closeModal}
            type="button"
            className="bg-rose-500 hover:bg-rose-600"
          >
            Close
          </CustomButton>
          <CustomButton
            onClick={savePreferences}
            type="button"
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            Save Preferences
          </CustomButton>
          <CustomButton
            onClick={clearPreferences}
            type="button"
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Clear Settings
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
