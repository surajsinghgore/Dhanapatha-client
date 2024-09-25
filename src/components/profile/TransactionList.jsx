import '../../style/profile.css';


const TransactionList = () => {
  const transactions = [
    { type: 'expense', title: 'Card payment', desc: 'Carrefour', amount: '-$24.85' },
    { type: 'income', title: 'Robert Olsson', desc: 'Pizza and juice', amount: '+$32.00' },
    { type: 'income', title: 'Robert Olsson', desc: 'Pizza and juice', amount: '+$32.00' },
    { type: 'income', title: 'Robert Olsson', desc: 'Pizza and juice', amount: '+$32.00' },
    { type: 'income', title: 'Robert Olsson', desc: 'Pizza and juice', amount: '+$32.00' },
  ];

  return (
    <div className="transaction-list">
      <h3>Transactions</h3>
      <div className="transaction-items">
        {transactions.map((transaction, index) => (
          <div key={index} className={`transaction-item ${transaction.type}`}>
            <div className="transaction-info">
              <p>{transaction.title}</p>
              <span>{transaction.desc}</span>
            </div>
            <p className="transaction-amount">{transaction.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
