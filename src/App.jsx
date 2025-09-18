import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/UserDashboard/Dashboard';
import Home from './pages/UserDashboard/Home';
import AddCustomer from './pages/UserDashboard/AddCustomer';
import AddTransaction from './pages/UserDashboard/AddTransaction';
import Ledger from './pages/UserDashboard/Ledger';
import Profile from './pages/UserDashboard/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/UserDashboard/AdminDashboard';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Load user from sessionStorage on app load
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Save user to sessionStorage whenever it changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  // Debugging logs
  console.log('App - Customers:', customers);
  console.log('App - Transactions:', transactions);
  console.log('App - User:', user);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Pass setUser so Login/Signup can update */}
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/user/*" element={<Dashboard />}>
              <Route index element={<Home customers={customers} transactions={transactions} />} />
              <Route
                path="add-customer"
                element={<AddCustomer setCustomers={setCustomers} customers={customers} />}
              />
              <Route
                path="add-transaction"
                element={<AddTransaction customers={customers} setTransactions={setTransactions} />}
              />
              <Route
                path="ledger"
                element={<Ledger customers={customers} transactions={transactions} />}
              />
              <Route path="profile" element={<Profile user={user} />} />
            </Route>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
