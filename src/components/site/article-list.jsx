/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import ArticleSkeleton from "../common/article-skeleton";
import ArticleCard from "./article-card";
import CustomButton from "../common/customButton";

export default function ArticleList({
  articles,
  isLoading,
  error,
  modelState,
  setShowModal,
}) {
  const { pathname } = useLocation();
  const feedPage = pathname === "/my-feed";

  const handleModal = () => {
    if (feedPage) {
      sessionStorage.setItem("modal-state", false);
      setShowModal(false);
    }
  };

  if (!isLoading && !error && articles?.length === 0) {
    return (
      <section className="flex items-center justify-center min-h-[50vh]">
        <h1 className="font-bold text-4xl">
          {feedPage && modelState ? "Your Feed Is Empty" : ""}
        </h1>
        <CustomButton
          onClick={handleModal}
          className="font-bold text-2xl bg-blue-500 mt-10"
        >
          Open Settings
        </CustomButton>
      </section>
    );
  }

  if (!isLoading && error) {
    return (
      <section className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500">{error || "An Error Occured"}</p>
      </section>
    );
  }

  return (
    <section className="pt-5 pb-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          new Array(20).fill().map((_, i) => <ArticleSkeleton key={i} />)}
        {articles?.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </section>
  );
}
