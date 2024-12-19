import { Link } from "react-router-dom";
import SiteLogo from "./site-logo";

export default function Header() {
  return (
    <header className="border-b py-4">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div className="flex items-center gap-10">
          <SiteLogo />
          <div className="space-x-5 font-medium">
            <Link to="/">Home</Link>
            <Link to="/my-feed">My Feeds</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
