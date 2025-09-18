import { useLocation } from 'react-router-dom';

function Ledger({ customers = [], transactions = [] }) {
  // Get the customerId from the URL query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get('customerId');

  // Filter customers based on customerId (if present)
  const filteredCustomers = customerId
    ? customers.filter(customer => customer.id === parseInt(customerId, 10))
    : customers;

  // Debugging logs
  console.log('Ledger - Customers:', customers);
  console.log('Ledger - Transactions:', transactions);
  console.log('Ledger - Filtered Customers:', filteredCustomers);

  const getCustomerBalance = (customerId) => {
    const customerTransactions = transactions.filter(t => t.customerId === customerId);
    console.log(`Transactions for customer ${customerId}:`, customerTransactions);
    return customerTransactions.reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);
  };

  return (
    <section className="dashboard-section ledger-section">
      <h3>Ledger</h3>
      {filteredCustomers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        filteredCustomers.map(customer => (
          <div key={customer.id} className="customer-card">
            <div className="customer-header">
              <h4>{customer.name} (Balance: ₹{getCustomerBalance(customer.id).toFixed(2)})</h4>
            </div>
            <ul className="transaction-list">
              {transactions
                .filter(t => t.customerId === customer.id)
                .map(t => (
                  <li key={t.id} className={`transaction-item ${t.type}`}>
                    <span>{t.type === 'credit' ? 'Received' : 'Given'}</span>
                    <span>₹{t.amount.toFixed(2)}</span>
                    <span>{t.date}</span>
                    {t.description && <span className="description">({t.description})</span>}
                  </li>
                ))}
              {transactions.filter(t => t.customerId === customer.id).length === 0 && (
                <li className="no-transactions">No transactions yet.</li>
              )}
            </ul>
          </div>
        ))
      )}
    </section>
  );
}

export default Ledger;