import React from 'react'
import './Header.css'
import { useState } from 'react'
import { FavoriteBorder} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginIcon from '@mui/icons-material/Login';


const Header = () => {
  // const favPage = 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useAuthState(auth);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Logout successful
        setIsLoggedIn(false); // Update the isLoggedIn state
      })
      .catch((error) => {
        // Handle any errors that occur during logout
        console.log("Logout error:", error);
      });
  };

  return (
    <div className='header-container'>
      <div className='header-items'>
        <div className='header-item'>
            <div>
              <Link to='/'>
                <div className='avatar'>
                    <img src='https://cdn-icons-png.flaticon.com/512/16/16363.png' alt='' className='avatar-icon'/>
                </div>
              </Link> 
            </div> 

            <div>
              <Link to='/favourites'>
                <div className='header-item'>
                    <FavoriteBorder/>
                    <h5>My List</h5>
                </div>
              </Link>  
            </div>

            <div className='login-flex'>
               {user ? (
                  <>
                    
                    <p>Hello, {user.email} <LoginIcon onClick={handleLogout} className='icon'/></p>
                    
                  </>
                ) : (
                  <Link to='/login'>
                    <LoginIcon/>
                  </Link>
                )} 
            </div>

        </div>
              
      </div>
    </div>
  )
}

export default Header
