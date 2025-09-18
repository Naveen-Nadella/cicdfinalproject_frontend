import { Link } from 'react-router-dom';

function Home({ customers = [], transactions = [] }) {
  // Calculate total amount given (debit)
  const totalGiven = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate total amount received (credit)
  const totalReceived = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  // Get the number of customers
  const customerCount = customers.length;

  return (
    <section className="dashboard-section home-section">
      <h3>Welcome to Your Dashboard</h3>
      <p>Manage your customers and transactions efficiently.</p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Amount Given</h4>
          <p className="amount given">₹{totalGiven.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h4>Total Amount Received</h4>
          <p className="amount received">₹{totalReceived.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h4>Number of Customers</h4>
          <p className="customer-count">{customerCount}</p>
        </div>
      </div>
      <div className="customer-list-section">
        <h4>Customers</h4>
        {customerCount === 0 ? (
          <p className="no-customers">No customers added yet.</p>
        ) : (
          <ul className="customer-list">
            {customers.map(customer => (
              <li key={customer.id} className="customer-item">
                <Link to={`/user/ledger?customerId=${customer.id}`}>
                  {customer.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Home;