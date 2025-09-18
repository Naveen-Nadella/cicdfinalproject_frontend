import { Outlet, Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        {/* Navbar header removed */}
        {/* <ul className="navbar-menu">
          <li>
            <Link to="/user">Home</Link>
          </li>
          <li>
            <Link to="/user/add-customer">Add Customer</Link>
          </li>
          <li>
            <Link to="/user/add-transaction">Add Transaction</Link>
          </li>
          <li>
            <Link to="/user/ledger">Ledger</Link>
          </li>
          <li>
            <Link to="/user/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul> */}
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
