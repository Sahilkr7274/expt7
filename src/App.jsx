import ErrorBoundary from './components/ErrorBoundary';
import FetchPosts from './components/FetchPosts';
import CrudPosts from './components/CrudPosts';
import AuthToken from './components/AuthToken';
import ErrorBoundaryDemo from './components/ErrorBoundaryDemo';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>REST APIs & HTTP Methods</h1>

      <ErrorBoundary>
        <AuthToken />
      </ErrorBoundary>

      <ErrorBoundary>
        <FetchPosts />
      </ErrorBoundary>

      <ErrorBoundary>
        <CrudPosts />
      </ErrorBoundary>

      <ErrorBoundary>
        <ErrorBoundaryDemo />
      </ErrorBoundary>
    </div>
  );
}

export default App;