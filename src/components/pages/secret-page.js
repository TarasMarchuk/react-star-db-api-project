import React from 'react';
import { Redirect } from 'react-router-dom';

const SecretPage = ({isLoggedIn}) => {

  if (isLoggedIn) {
    return (
      <div className="jumbotron text-center">
        <h3>This page is very secret!</h3>
      </div>
    );
  }
  return <Redirect to="/login" />
};

export default SecretPage;