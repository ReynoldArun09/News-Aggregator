import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import FeedPage from "./pages/feed-page";
import NotFoundPage from "./pages/not-found-page";
import RootLayout from "./components/layout/root-layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/my-feed" element={<FeedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
