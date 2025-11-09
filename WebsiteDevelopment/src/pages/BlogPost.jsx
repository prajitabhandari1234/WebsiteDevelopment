import { useParams, Link } from "react-router-dom";
import { POSTS } from "../data/posts";
import "../Styles/Join.css";
import "../Styles/Blog.css";

export default function BlogPost() {
  const { id } = useParams();
  const post = POSTS.find(p => p.id === id);

  const onImgError = (e) => { e.currentTarget.src="/images/logo.jpg"; e.currentTarget.alt="Club logo"; };

  if (!post) {
    return (
      <section className="blogs-section">
        <div className="container">
          <p>Post not found. <Link to="/blog">Back to Blog</Link></p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <span className="hero-badge">{post.category}</span>
            <h1 className="cta-section-title">{post.title}</h1>
            <p className="cta-section-subtitle">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            </p>
          </div>
        </div>
      </section>

      <section className="blog-post">
        <div className="container">
          <div className="post-media">
            <img src={post.cover} alt={post.title} loading="lazy" onError={onImgError} />
          </div>
          <article className="post-body">
            {post.body.split("\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </article>
          <p className="back-link"><Link to="/blog">← Back to Blog</Link></p>
        </div>
      </section>
    </>
  );
}
