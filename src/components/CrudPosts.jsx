import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

export default function CrudPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: '', body: '' });
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/posts?_limit=5')
      .then(res => setPosts(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;

    try {
      if (editId) {
        // PUT - Update
        const res = await api.put(`/posts/${editId}`, { ...form, userId: 1 });
        setPosts(posts.map(p => p.id === editId ? { ...res.data, id: editId } : p));
        setStatus('Post updated successfully!');
        setEditId(null);
      } else {
        // POST - Create
        const res = await api.post('/posts', { ...form, userId: 1 });
        setPosts([{ ...res.data, id: Date.now() }, ...posts]);
        setStatus('Post created successfully!');
      }
      setForm({ title: '', body: '' });
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p.id !== id));
      setStatus('Post deleted!');
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setForm({ title: post.title, body: post.body });
  };

  return (
    <div className="section">
      <h2>2. CRUD Operations with Axios</h2>

      <form onSubmit={handleSubmit} className="crud-form">
        <input
          placeholder="Post title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Post body"
          value={form.body}
          onChange={e => setForm({ ...form, body: e.target.value })}
          rows={3}
        />
        <div className="btn-row">
          <button type="submit">{editId ? 'Update Post' : 'Create Post'}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', body: '' }); }}>Cancel</button>}
        </div>
      </form>

      {status && <p className={status.startsWith('Error') ? 'error' : 'success'}>{status}</p>}

      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {posts.map(post => (
        <div key={post.id} className="card">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <div className="btn-row">
            <button className="btn-edit" onClick={() => handleEdit(post)}>Edit</button>
            <button className="btn-delete" onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}