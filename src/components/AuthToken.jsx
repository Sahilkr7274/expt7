import { useState } from 'react';
import api from '../api/axiosInstance';

export default function AuthToken() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulating login - using JSONPlaceholder user as mock
      const res = await api.get('/users/1');
      const mockToken = btoa(`${res.data.email}:mock-secret-${Date.now()}`);
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <div className="section">
      <h2>3. Authentication Tokens</h2>

      {!token ? (
        <div>
          <p>Not logged in. Click to simulate login and store token.</p>
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login (Mock)'}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div>
          <p className="success">Logged in!</p>
          {user && (
            <div className="card">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Token:</strong> <code>{token.slice(0, 30)}...</code></p>
            </div>
          )}
          <button className="btn-delete" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}