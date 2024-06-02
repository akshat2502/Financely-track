import React from 'react'
import Header from '../components/headers/header';
import SignupSigninComponent from '../SingupSignin/index';

function Signup() {
  return (
    <div>
      <Header />
      <div className='wrapper'><SignupSigninComponent /></div>
    </div>
  )
}

export default Signup;

