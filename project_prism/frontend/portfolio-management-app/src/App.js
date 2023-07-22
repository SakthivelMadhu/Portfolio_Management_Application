// project_prism/frontend/src/App.js
import React from 'react';
import './App.css';
import PortfolioManager from './components/PortfolioManager/PortfolioManager';
import Project from './components/Project/Project';
import Task from './components/Task/Task';
import Resource from './components/Resource/Resource';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Prism - Portfolio Management Application</h1>
      </header>
      <main>
        <Signup />
        <Login />
        <Logout />
        <PortfolioManager />
        <Project />
        <Task />
        <Resource />
      </main>
      <footer>
        <p>Copyright © {new Date().getFullYear()} Project Prism. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
