import { useFetch } from '../hooks/useFetch';

export default function FetchPosts() {
  const { data: posts, loading, error } = useFetch('/posts?_limit=5');

  return (
    <div className="section">
      <h2>1. Fetch Data from External API (JSONPlaceholder)</h2>

      {loading && <div className="loader">Loading posts...</div>}
      {error && <div className="error">Error: {error}</div>}

      {posts && posts.map(post => (
        <div key={post.id} className="card">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}