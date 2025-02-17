// App.js
import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <AuthProvider>
      <div className="App">
        {!auth ? <Login setAuth={setAuth} /> : <Dashboard setAuth={setAuth} />}
      </div>
    </AuthProvider>
  );
};

export default App;