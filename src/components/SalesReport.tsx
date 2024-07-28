import React, { useState, useEffect } from "react";
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
      <div className="py-20">
        <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
        <div className="flex gap-2 w-full my-4 items-center">
          <p className="font-medium">Select Date</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-1"
          />
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-medium mb-4">Sales</h2>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors bg-gray-100 hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Price
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Quantity
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {sales.map((sale) => {
                  return (
                    <tr className="border-b transition-colors">
                      <td className="p-4 align-middle">{sale.drug}</td>
                      <td className="p-4 align-middle">GHS {sale.unitPrice}</td>
                      <td className="p-4 align-middle">{sale.quantity}</td>
                      <td className="p-4 align-middle">
                        {(sale.unitPrice * sale.quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-lg mt-4 text-gray-700 font-medium">
            Total Amount: GHS {calculateTotal().toFixed(2)}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SalesReport;
