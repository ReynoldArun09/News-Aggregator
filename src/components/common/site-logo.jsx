import { NewspaperIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function SiteLogo() {
  return (
    <Link to="/" className="flex items-center justify-between gap-2">
      <NewspaperIcon />
      <span className="hidden font-bold tracking-wider lg:block">
        News Aggregator
      </span>
    </Link>
  );
}
