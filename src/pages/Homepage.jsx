import React from 'react';
import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import AppNav from '../components/AppNav';
function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>WorldWise111</h1>

      <Link to='/app'>got to the app</Link>
    </div>
  );
}

export default Homepage;
