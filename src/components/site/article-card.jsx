/* eslint-disable react/prop-types */
export default function ArticleCard({ article }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="h-64 w-full">
        <img
          src={article?.urlToImage || "/placeholder.png"}
          alt={article?.name || "article image"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-3 pt-2 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2">
          {article?.title?.slice(0, 50)}
        </h2>
        <p className="text-gray-600 flex-grow">
          {article?.description?.slice(0, 125)}...
        </p>
        <p className="text-gray-600 flex-grow">
          {article?.publishedAt?.slice(0, 10)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            {article?.source || "Unkown Source"}{" "}
          </span>
          <a
            href={article?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 py-2 px-4 rounded-md text-white"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
