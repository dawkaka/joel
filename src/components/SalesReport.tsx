import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sale, getSalesForDate } from "../db";
import Layout from "./Layout";

const SalesReport: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    loadSales();
  }, [date]);

  const loadSales = async () => {
    const salesData = getSalesForDate(date);
    setSales(salesData);
  };

  const calculateTotal = () => {
    return sales.reduce((total, sale) => {
      return total + sale.unitPrice * sale.quantity;
    }, 0);
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mb-4"
        />
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th>Drug</th>
              <th>Quantity Sold</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, ind) => (
              <tr key={ind}>
                <td>{sale.drug}</td>
                <td>{sale.quantity}</td>
                <td>GHS {sale.unitPrice.toFixed(2)}</td>
                <td>GHS {(sale.unitPrice * sale.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xl font-bold">
          Total Amount: ${calculateTotal().toFixed(2)}
        </p>
        <Link to="/" className="block mt-4 text-blue-500">
          Back to Store Keeper
        </Link>
      </div>
    </Layout>
  );
};

export default SalesReport;
