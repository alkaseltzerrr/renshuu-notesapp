import { useState } from 'react';

function AuthForm({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    let result;
    if (isLogin) {
      result = await onAuth('login', email, password);
    } else {
      result = await onAuth('register', email, password);
    }
    if (result && result.error) {
      setError(result.error.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}

export default AuthForm;
