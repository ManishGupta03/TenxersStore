import {useState} from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
const url = 'http://localhost:9090';




const LoginSignup = () => {
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [formData, setFormData] = useState({ email: '',  password: '',  role: '',  });// For signup
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const roles = ['Select role....','Admin', 'Customer']; // Array for dropdown options

    const handleInputChange = (event) => {
      const { name, value } = event.target;
    //   console.log("data",name,value,event.target)
      setFormData({ ...formData, [name] : value  });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Clear any previous errors
        console.log("active or not ", isLoginActive)
        if (isLoginActive) {
          
          // Login logic
          if (!formData.email || !formData.password) {
            setError('Email and password are required.');
            return;
          }
              
          const response = await axios.post(`${url}/auth/login`, formData);
          if (response?.data?.statusCode !== '200' || response?.data?.responseStatus === 'Failed') {
            setError(response?.data?.message);
            return;
          }
          localStorage.setItem("name1",response.data.data.role)
          localStorage.setItem("id",response.data.data.id);
          // Check user role and redirect based on role
          if (response?.data?.data?.role === 'Admin') {
            console.log('Redirecting to Admin.js');
            navigate('/admin');
  
          } 
          else if (response?.data?.data?.role === 'Customer') {
            // Redirect to Customer.js component
            console.log('Redirecting to Customer.js');
          
            navigate('/customer');
          } else {
            // Handle unexpected role value
            setError('Invalid user role.');
          }
        } else {
          // Signup logic
          if (!formData.email || !formData.password || !formData.role) {
            setError('Email, password, and role are required.');
            return;
          }
          const response = await axios.post(`${url}/auth/signup`, formData);
          if (response?.data?.statusCode !== '200' || response?.data?.responseStatus === 'Failed') {
            setError(response?.data?.message);
            return;
          }
          // Handle successful signup (e.g., redirect to login)
          console.log('Signup successful!');
          setIsLoginActive(true); // Switch back to login form
        }
      }; 

      const toggleForm = () => {
        setIsLoginActive(!isLoginActive);
      };  
  return (
    <div className="login-signup-container flex flex-col items-center justify-center min-h-screen  text-white">
        <h1 className='text-4xl mb-8 text-center'>{isLoginActive ? 'Login' : 'Signup'}</h1>
  
        {error && <div className="error-message">{error}</div>}
  
        <form className= "flex flex-col w-72 p-10 bg-black bg-opacity-70 rounded-lg shadow-md" onSubmit={handleFormSubmit}>
          {isLoginActive ? (
            <>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email}  onChange={handleInputChange} required />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password"  value={formData.password}  onChange={handleInputChange} required />
            </>
          ) : (
            <>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email"  value={formData.email} onChange={handleInputChange}  required />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/>
              <label htmlFor="role">Role:</label>
              <select name="role" id="role" value={formData.role} onChange={handleInputChange} required>
              {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </>
      )}
          <button type="submit">{isLoginActive ? 'Login' : 'Signup'}</button>
        </form>
  
        <p>
          {isLoginActive ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={toggleForm}>{isLoginActive ? 'Signup' : 'Login'}</span>
        </p>
      </div>
  )
}

export default LoginSignup