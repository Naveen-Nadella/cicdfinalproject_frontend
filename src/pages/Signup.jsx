import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup({ setUser }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    dob: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, gender, dob, password } = form;

    if (!name.trim()) return setError('Name is required');
    if (!/\S+@\S+\.\S+/.test(email)) return setError('A valid email is required');
    if (!/^\d{10}$/.test(mobile)) return setError('A valid 10-digit mobile number is required');
    if (!gender) return setError('Gender is required');
    if (!dob) return setError('Date of birth is required');
    if (!password.trim()) return setError('Password is required');

    const age = calculateAge(dob);
    if (age < 18) return setError('You must be 18 or older to register');

    try {
      const response = await axios.post('http://localhost:1014/api/auth/signup', {
        ...form,
        age,
      });

      console.log('Signup successful:', response.data);

      // Optional: save user
      if (typeof setUser === 'function') setUser(response.data);

      // ✅ Show success alert
      alert('Registration successful! Please login.');

      // ✅ Redirect to login page
      navigate('/');
    } catch (err) {
      setError(err.response?.data || err.message);
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'mobile', 'password'].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              id={field}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              required
            />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
}

export default Signup;
