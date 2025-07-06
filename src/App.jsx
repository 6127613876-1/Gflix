// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Movie from '../src/routes/Movie';
import Landing from '../src/routes/Landing';
import Login from '../src/pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/Profile';
import Watchlist from "./pages/Watchlist";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/movie"
          element={
            <PrivateRoute>
              <Movie />
            </PrivateRoute>
          }
        />
        <Route path="/watchlist" element={<PrivateRoute><Watchlist /></PrivateRoute>} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
