// client/src/api/userApi.js
import axios from 'axios';

export const saveUserToDB = async (user) => {
  // Get the token from localStorage (or from wherever you store it)
  const token = localStorage.getItem('token');
  
  // If the token is missing or invalid, stop the request
  if (!token) {
    console.error('Token is missing or invalid');
    return;
  }

  try {
    // Send the user data along with the Authorization header
    const response = await axios.post(
      'http://localhost:5000/api/users', 
      {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.name || 'Unknown',
        phone: user.phone || 'N/A',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token here
        },
      }
    );
    return response.data; // return the response data as needed
  } catch (error) {
    // Log the error message from the response
    console.error('Error saving user:', error.response?.data || error.message);
    throw error; // Propagate the error for further handling
  }
};
