import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography'; // Added missing import
import Navbar from './components/Navbar';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';

const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600, marginBottom: '1rem' }
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<TopUsers />} />
              <Route path="/top-users" element={<TopUsers />} />
              <Route path="/trending" element={<TrendingPosts />} />
              <Route path="/feed" element={<Feed />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <Typography variant="body2">
              Social Media Analytics © {new Date().getFullYear()}
            </Typography>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;