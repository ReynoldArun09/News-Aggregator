import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);
  return (
    <section className="flex items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">Page Not Found</h1>
    </section>
  );
}
