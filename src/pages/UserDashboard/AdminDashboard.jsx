import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// DisplayUsers component
function DisplayUsers({ users, onDelete }) {
  return (
    <div className="dashboard-content">
      <h2>Display Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.mobile}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.gender}</td>
                <td>{user.dob}</td>
                <td>
                  <Link to={`/admin-dashboard/edit-user/${user.mobile}`}>
                    <button className="btn-primary btn-small">Edit</button>
                  </Link>
                  <button
                    className="btn-danger btn-small"
                    onClick={() => onDelete(user.mobile)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// AddUsers component
function AddUsers({ onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('A valid email is required');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setError('A valid 10-digit phone number is required');
      return;
    }
    if (!gender.trim()) {
      setError('Gender is required');
      return;
    }
    if (!dob) {
      setError('Date of birth is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    const newUser = {
      name,
      email,
      mobile,
      gender,
      dob,
      password,
    };

    try {
      const response = await axios.post('http://localhost:1014/api/auth/signup', newUser);
      onAdd(response.data);
      setSuccessMessage('User added successfully!');
      setTimeout(() => {
        navigate('/admin-dashboard/display-users');
      }, 1000);
      setName('');
      setEmail('');
      setMobile('');
      setGender('');
      setDob('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user. Please try again.');
      console.error('Error adding user:', err);
    }
  };

  return (
    <div className="dashboard-content">
      <h2>Add New User</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Enter 10-digit phone number" required pattern="[0-9]{10}" maxLength={10} />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value)} required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
        </div>
        <button type="submit" className="btn-primary">
          Add User
        </button>
      </form>
    </div>
  );
}

// EditUser component
function EditUser({ users, onUpdate }) {
  const { mobile } = useParams();
  const user = users.find(u => u.mobile === mobile);
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [mobileState, setMobileState] = useState(user ? user.mobile : '');
  const [gender, setGender] = useState(user ? user.gender : '');
  const [dob, setDob] = useState(user ? user.dob : '');
  const [password, setPassword] = useState(user ? user.password : '');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  if (!user) {
    return <div className="dashboard-content"><h2>User not found</h2></div>;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('A valid email is required');
      return;
    }
    if (!/^\d{10}$/.test(mobileState)) {
      setError('A valid 10-digit phone number is required');
      return;
    }
    if (!gender.trim()) {
      setError('Gender is required');
      return;
    }
    if (!dob) {
      setError('Date of birth is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    const updatedUser = { name, email, mobile: mobileState, gender, dob, password };

    try {
      const response = await axios.put(`http://localhost:1014/api/auth/users/${mobile}`, updatedUser);
      onUpdate(response.data);
      setSuccessMessage('User updated successfully!');
      setTimeout(() => {
        navigate('/admin-dashboard/display-users');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user. Please try again.');
      console.error('Error updating user:', err);
    }
  };

  return (
    <div className="dashboard-content">
      <h2>Edit User</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" value={mobileState} onChange={e => setMobileState(e.target.value)} placeholder="Enter 10-digit phone number" required pattern="[0-9]{10}" maxLength={10} />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value)} required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
        </div>
        <button type="submit" className="btn-primary">Update User</button>
        <button type="button" className="btn-secondary" onClick={() => navigate('/admin-dashboard/display-users')}>Cancel</button>
      </form>
    </div>
  );
}

// AdminDashboard component
function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:1014/api/auth/getAllUsers');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = newUser => {
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = updatedUser => {
    setUsers(users.map(u => (u.mobile === updatedUser.mobile ? updatedUser : u)));
  };

  const handleDeleteUser = async userMobile => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:1014/api/auth/users/${userMobile}`);
        setUsers(users.filter(user => user.mobile !== userMobile));
      } catch (err) {
        setError('Failed to delete user. Please try again.');
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleLogout = () => {
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h3>Admin Dashboard</h3>
        <nav>
          <ul>
            <li><Link to="/admin-dashboard/display-users">Display Users</Link></li>
            <li><Link to="/admin-dashboard/add-users">Add Users</Link></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        <Routes>
          <Route path="display-users" element={<DisplayUsers users={users} onDelete={handleDeleteUser} />} />
          <Route path="add-users" element={<AddUsers onAdd={handleAddUser} />} />
          <Route path="edit-user/:mobile" element={<EditUser users={users} onUpdate={handleUpdateUser} />} />
          <Route path="/" element={<h2>Welcome Admin</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
