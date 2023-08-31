import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


// Inside the onSubmit function
const sendUserDataToBackend = async (uid, userEmail) => {
    try {
      const url = 'https://ce6d-103-93-20-138.ngrok-free.app/api/users/signup'; // Replace with your backend URL
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify({ firebaseId: uid, email: userEmail, role: "CUSTOMER" }), // Include the role here
      });
  
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('id', responseData.id);
        console.log('id:', responseData.id);
        console.log('User data sent to backend successfully');
      } else {
        console.error('Error sending user data to backend:', response.status);
      }
    } catch (error) {
      console.error('Error sending user data to backend:', error);
    }
  };
  
  // Inside the onSubmit function
 // Inside the onSubmit function
const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      
      // Store UID and email in local storage
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('email', email);

      console.log('UID:', user.uid);
      console.log('Email:', email);
   
  
      // Send UID and email to backend
      sendUserDataToBackend(user.uid, email);
  
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  
  

  return (
    <main>
      <section>
        <div>
          <div>
            <h1>sign</h1>
            <form>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <button type="submit" onClick={onSubmit}>
                Sign up
              </button>
            </form>

            <p>
              Already have an account?{' '}
              <NavLink to="/login">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
