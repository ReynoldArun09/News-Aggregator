import { Outlet } from "react-router-dom";
import Header from "../common/header";

export default function RootLayout() {
  return (
    <section>
      <Header />
      <main className="container mx-auto px-6 md:px-4 py-6 md:py-4">
        <Outlet />
      </main>
    </section>
  );
}
