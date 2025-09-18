import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCustomer({ setCustomers, customers = [] }) {
  const [newCustomer, setNewCustomer] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const addCustomer = (e) => {
    e.preventDefault();
    if (!newCustomer.trim()) {
      setError('Customer name cannot be empty');
      return;
    }
    if (typeof setCustomers === 'function') {
      setCustomers([...customers, { name: newCustomer.trim(), id: Date.now() }]);
      setNewCustomer('');
      setError('');
      navigate('/user/ledger');
    } else {
      console.error('setCustomers is not a function');
    }
  };

  const handleCancel = () => {
    setNewCustomer('');
    setError('');
    navigate('/user');
  };

  return (
    <section className="dashboard-section customer-section">
      <h3>Add Customer</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={addCustomer}>
        <div className="form-group">
          <label htmlFor="customer-name">Customer Name</label>
          <input
            id="customer-name"
            type="text"
            value={newCustomer}
            onChange={(e) => setNewCustomer(e.target.value)}
            placeholder="Enter customer name"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Add Customer</button>
          <button type="button" className="btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddCustomer;