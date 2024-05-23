// src/App.js
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
import GolferTrophyRoom from './components/profile/trophyRoom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/courses/search" component={CourseSearch} />
          <Route path="/courses/:id" component={CourseDetails} />
          <Route path="/rounds/:id" component={RoundDetails} />
          <Route path="/scorecard/:id" component={Scorecard} />
          <Route path="/golfers/:golferId/trophy-room" component={GolferTrophyRoom} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
