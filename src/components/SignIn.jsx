import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignIn = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This is where you handle the sign-in success
        const user = result.user;
        console.log('User signed in:', user);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error signing in with Google:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Sign in to Your Account</h1>
      <button 
        onClick={handleSignInWithGoogle} 
        className="bg-blue-500 hover:bg-opacity-50 bg-purple font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
