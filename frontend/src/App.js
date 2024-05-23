import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/forms/registrationForm';
import Login from './components/forms/loginForm';
import Profile from './components/profile/profile';
import CourseSearch from './components/courses/courseSearch';
import CourseDetails from './components/courses/courseDetails';
import RoundDetails from './components/rounds/roundDetails';
import Scorecard from './components/rounds/scorecard';
import Header from './components/common/header';
import GameTypes from './components/GameTypes'; // Add this line

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses/search" element={<CourseSearch />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/rounds/:id" element={<RoundDetails />} />
          <Route path="/scorecard/:id" element={<Scorecard />} />
          <Route path="/game-types" element={<GameTypes />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
