import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTransaction({ customers = [], setTransactions }) {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('credit');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedCustomer) {
      setError('Please select a customer');
      return;
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    // Create new transaction
    const newTransaction = {
      customerId: parseInt(selectedCustomer, 10), // Convert to number
      amount: parseFloat(amount),
      type,
      description: description.trim() || `Transaction on ${new Date().toLocaleDateString()}`,
      date: new Date().toLocaleString(),
      id: Date.now()
    };

    // Update transactions state
    if (typeof setTransactions === 'function') {
      setTransactions(prev => [...prev, newTransaction]);
    } else {
      console.error('setTransactions is not a function');
      return;
    }

    // Reset form
    setSelectedCustomer('');
    setAmount('');
    setType('credit');
    setDescription('');
    setError('');

    // Navigate to ledger
    navigate('/user/ledger');
  };

  const handleCancel = () => {
    // Reset form and navigate back to home
    setSelectedCustomer('');
    setAmount('');
    setType('credit');
    setDescription('');
    setError('');
    navigate('/user');
  };

  return (
    <section className="dashboard-section transaction-section">
      <h3>Add Transaction</h3>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer">Customer</label>
          <select
            id="customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">Select Customer</option>
            {customers.length > 0 ? (
              customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))
            ) : (
              <option value="" disabled>No customers available</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="credit">Credit (Received)</option>
            <option value="debit">Debit (Given)</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter transaction details"
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Add Transaction</button>
          <button type="button" className="btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddTransaction;