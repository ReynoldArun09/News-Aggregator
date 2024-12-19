import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/site/searchbar";
import FilterOptions from "../components/site/filter-options";
import ArticleList from "../components/site/article-list";
import { useEffect } from "react";
import { fetchArticles } from "../store/features/articles-slice";
import { sources, availableCategories } from "../utils/constants";

export default function HomePage() {
  const { articles, isLoading, error } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchArticles({
        sources,
        filters: {
          category: availableCategories[0],
        },
      })
    );
  }, [dispatch]);

  return (
    <section>
      <SearchBar />
      <FilterOptions />
      <ArticleList articles={articles} isLoading={isLoading} error={error} />
    </section>
  );
}
