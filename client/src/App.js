import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import AboutPost from './pages/AboutPost';
import RegisterUser from './pages/RegisterUser';
import LoginUser from './pages/LoginUser';
import LogoutUser from './pages/LogoutUser';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {
  const { authState } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <Router>
        <nav>
          {authState.isAuthorized ? (
            <>
              <Link to='/posts' className="nav-link">Home</Link>
              <Link to='/createPost' className="nav-link">Create Post</Link>
              <div className="nav-right">
                <Link to='/' className="username-link" onClick={toggleDropdown}>
                  Hello, {authState.username}<span className="arrow">▼</span>
                </Link>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to='/profile' className="dropdown-item">Profile</Link>
                    <Link to='/logoutUser' className="dropdown-item">Logout</Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to='/loginUser' className="nav-link">Login</Link>
              <Link to='/registerUser' className="nav-link">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/aboutPost/:id' element={<AboutPost />} />
          <Route path='/editPost/:id' element={<EditPost />} />
          <Route path='/registerUser' element={<RegisterUser />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/loginUser' element={<LoginUser />} />
          <Route path='/logoutUser' element={<LogoutUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
