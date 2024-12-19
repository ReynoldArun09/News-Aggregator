import { useState, useEffect } from "react";
import FeedModal from "../components/site/feed-modal";
import ArticleList from "../components/site/article-list";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/features/articles-slice";

export default function FeedPage() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(
    () => JSON.parse(sessionStorage.getItem("modal-state")) || false
  );

  const { articles, isLoading, error } = useSelector((state) => state.articles);
  const setCategories = JSON.parse(sessionStorage.getItem("selectcategories"));
  const setSources = JSON.parse(sessionStorage.getItem("selectsources"));
  const shouldShowArticles = setCategories && setSources;

  useEffect(() => {
    dispatch(
      fetchArticles({
        sources: setSources,
        filters: {
          category: setCategories,
        },
      })
    );
  }, [dispatch]);

  return (
    <section>
      {!showModal && <FeedModal setShowModal={setShowModal} />}
      <ArticleList
        articles={showModal && shouldShowArticles ? articles : []}
        isLoading={isLoading}
        error={error}
        modalState={showModal}
        setShowModal={setShowModal}
        shouldShowArticles={shouldShowArticles}
      />
    </section>
  );
}
