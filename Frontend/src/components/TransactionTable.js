import React, { useState } from "react";
import "../styles/Transactions.css";
import { formatDate, formatAmountDecimal } from "../utils/helpers.js";
import Auth from "../utils/auth";
import { GoTrash } from "react-icons/go";
import { FaDownload } from "react-icons/fa";

const TransactionTable = ({
  data,
  loading,
  deleteTransaction,
  transactions,
  setTransactions,
}) => {
  const [sortOption, setSortOption] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDeleteTransaction = async (e) => {
    e.preventDefault();
    const transactionId = e.currentTarget.id;
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteTransaction({
        variables: { transactionId },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
    setTransactions(
      transactions.filter((transaction) => transaction._id !== transactionId)
    );
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleDownloadCSV = () => {
    const headers = ["Date", "Essential", "Category", "Amount", "Description"];
    const rows = filteredTransactions.map((transaction) => [
      formatDate(transaction.date),
      transaction.highLevelCategory,
      transaction.category,
      formatAmountDecimal(transaction.amount),
      transaction.description,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transactions.csv";
    link.click();
  };

  // Filter transactions by date range and search query
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(parseInt(transaction.date));
    const withinStartDate = startDate ? transactionDate >= new Date(startDate) : true;
    const withinEndDate = endDate ? transactionDate <= new Date(endDate) : true;
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatAmountDecimal(transaction.amount).toLowerCase().includes(searchQuery.toLowerCase());
    return withinStartDate && withinEndDate && matchesSearch;
  });

  // Sort transactions based on selected sort option
  let sortedTransactions = [...filteredTransactions];
  if (sortOption === "date") {
    sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortOption === "amount") {
    sortedTransactions.sort((a, b) => b.amount - a.amount);
  } else if (sortOption === "category") {
    sortedTransactions.sort((a, b) => a.category.localeCompare(b.category));
  }

  // Pagination calculations
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="form-group sort-div d-flex">
          <label htmlFor="sort-option-select" className="sort">
            Sort By:
          </label>
          <select
            className="form-control form-select"
            id="sort-option-select"
            value={sortOption}
            onChange={handleSortOptionChange}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleDownloadCSV}>
          <FaDownload /> Download CSV
        </button>
      </div>

      <div className="d-flex mb-3">
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <input
          type="text"
          className="form-control"
          placeholder="Search by description, category, amount"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-light">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Essential?</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.highLevelCategory}</td>
                <td>{transaction.category}</td>
                <td>{formatAmountDecimal(transaction.amount)}</td>
                <td>{transaction.description}</td>
                <td>
                  <button
                    className="btn"
                    id={transaction._id}
                    onClick={handleDeleteTransaction}
                  >
                    <GoTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={transactionsPerPage}
          totalItems={sortedTransactions.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TransactionTable;
