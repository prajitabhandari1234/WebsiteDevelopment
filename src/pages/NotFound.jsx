import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="container">
      <h1>404 — Page Not Found</h1>
      <p>Try going <Link to="/">home</Link>.</p>
    </section>
  );
}
