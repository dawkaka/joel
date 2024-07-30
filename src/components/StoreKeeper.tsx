import React, { useState, useEffect } from "react";
import { Drug, Sale, getDrugs, updateDrug, addSale } from "../db";
import Layout from "./Layout";
import Select from "react-select";
import toast from "react-hot-toast";

const StoreKeeper: React.FC = () => {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [sale, setSale] = useState<Omit<Sale, "date">>({
    quantity: 0,
    unitPrice: 0,
    drug: "",
  });

  useEffect(() => {
    loadDrugs();
  }, []);

  const loadDrugs = async () => {
    const drugsData = getDrugs();
    setDrugs(drugsData);
  };

  const handleSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sale.drug === "") {
      toast.error("Item cannot be empty");
      return;
    }
    const drug = drugs.find((d) => d.name === sale.drug);
    if (!drug) {
      toast.error("Item not found");
      return;
    }
    if (sale.quantity <= 0) {
      toast.error("Quantity sold must be greater than 0");
      return;
    }
    if (drug.quantity > sale.quantity) {
      updateDrug(drug.id!, { quantity: drug.quantity - sale.quantity });
      addSale({
        ...sale,
        unitPrice: drug.unitPrice,
        date: new Date().toISOString().split("T")[0],
      });
      setSale({ drug: "", unitPrice: 0, quantity: 0 });
      loadDrugs();
      toast.success("Sale recorded successfully");
    } else {
      toast.error("Not enough quantity in stock");
    }
  };
  const options = drugs.map((drug) => {
    return { value: drug.name, label: drug.name };
  });

  return (
    <Layout>
      <div className="py-20">
        <h2 className="text-2xl font-bold mb-4">Store Dashboard</h2>
        <div className="mb-4 flex gap-2 w-full mt-4">
          <Select
            options={options}
            className="w-96 min-w-12 h-10"
            value={{ value: sale.drug, label: sale.drug }}
            onChange={(e) => {
              if (e) {
                setSale({ ...sale, drug: e.value });
              }
            }}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={sale.quantity}
            onChange={(e) =>
              setSale({ ...sale, quantity: Number(e.target.value) })
            }
            className="border px-2 min-w-12 h-10"
          />
          <button
            type="button"
            className="bg-green-500 h-10 text-white px-2 rounded"
            onClick={handleSale}
          >
            Record Sale
          </button>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Items</h2>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Price
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {drugs.map((drug) => {
                  return (
                    <tr className="border-b transition-colors">
                      <td className="p-4 align-middle">{drug.name}</td>
                      <td className="p-4 align-middle">GHS {drug.unitPrice}</td>
                      <td className="p-4 align-middle">{drug.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoreKeeper;
