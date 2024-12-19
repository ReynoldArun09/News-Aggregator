export default function ArticleSkeleton() {
  return (
    <section className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow animate-pulse">
      <div className="h-64 w-full bg-gray-300 rounded-md"></div>
      <div className="space-y-3 pt-2">
        <div className="bg-gray-300 w-3/4 h-6 rounded-md"></div>
        <div className="bg-gray-300 w-1/2 h-4 rounded-md"></div>
        <div className="flex items-center justify-between">
          <div className="bg-gray-300 w-1/4 h-4 rounded-md"></div>
          <div className="bg-gray-300 w-1/3 h-10 rounded-md"></div>
        </div>
      </div>
    </section>
  );
}
