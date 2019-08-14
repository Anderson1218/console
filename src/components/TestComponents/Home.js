import React from 'react';
import {Link} from 'react-router-dom';

//use css modules as stylesheet
function Home() {
    return (
      <div>
          <Link to='/counter'>To counter page</Link>
      </div>
    );
  }
  
export default Home;