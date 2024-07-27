import { useEffect, useState } from "react";
import { Drug, getDrugs, addDrug, updateDrug, deleteDrug } from "../db";
import Layout from "./Layout";

const Admin: React.FC = () => {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [updateId, setUpdateId] = useState<number>();

  const [uname, setuName] = useState("");
  const [uquantity, setuQuantity] = useState(0);
  const [uunitPrice, setuUnitPrice] = useState(0);

  useEffect(() => {
    loadDrugs();
  }, []);

  const loadDrugs = async () => {
    const drugsData = await getDrugs();
    setDrugs(drugsData);
  };

  const handleAddDrug = () => {
    if (name === "") {
      alert("Drug name cannot be empty");
      return;
    }
    const newDrug = {
      name,
      quantity,
      unitPrice,
    };

    addDrug(newDrug);
    setName("");
    setQuantity(0);
    setUnitPrice(0);
    loadDrugs();
  };

  const handleUpdateDrug = () => {
    if (updateId) {
      const newDrug = {
        name: uname,
        quantity: uquantity,
        unitPrice: uunitPrice,
      };

      updateDrug(updateId, newDrug);
      setuName("");
      setuQuantity(0);
      setuUnitPrice(0);
      setUpdateId(undefined);
      loadDrugs();
    }
  };

  const handleDeleteDrug = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this drug?")) {
      return;
    }
    deleteDrug(id);
    loadDrugs();
  };

  return (
    <Layout>
      <div className="w-full py-14 relative">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form className="grid grid-cols-3 gap-4" onSubmit={handleAddDrug}>
            <div className="col-span-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background "
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="col-span-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background "
                id="price"
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
              />
            </div>
            <div className="col-span-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background "
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="col-span-3">
              <button
                type="button"
                onClick={handleAddDrug}
                className="inline-flex items-center justify-center bg-slate-800 hover:cursor-pointer text-white w-max text-center px-4 py-2 text-sm rounded-lg"
              >
                Add Drug
              </button>
            </div>
          </form>
        </div>
        {updateId !== undefined && (
          <div
            className="bg-black rounded-lg shadow p-4 fixed inset-0  z-50 flex flex-col items-center justify-center  bg-opacity-35"
            onClick={() => setUpdateId(undefined)}
          >
            <form
              className="grid grid-cols-3 gap-4 bg-white rounded-lg shadow p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="col-span-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background "
                  id="name"
                  onChange={(e) => setuName(e.target.value)}
                  value={uname}
                />
              </div>
              <div className="col-span-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background "
                  id="price"
                  type="number"
                  value={uunitPrice}
                  onChange={(e) => setuUnitPrice(Number(e.target.value))}
                />
              </div>
              <div className="col-span-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="quantity"
                >
                  Quantity
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background "
                  id="quantity"
                  type="number"
                  value={uquantity}
                  onChange={(e) => setuQuantity(Number(e.target.value))}
                />
              </div>
              <div className="col-span-3">
                <button
                  type="button"
                  onClick={handleUpdateDrug}
                  className="inline-flex items-center justify-center bg-slate-800 hover:cursor-pointer text-white w-max text-center px-4 py-2 text-sm rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="bg-white rounded-lg border shadow p-6">
          <h2 className="text-xl font-bold mb-4">Drugs</h2>
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
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Actions
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
                      <td className="p-4 flex gap-4 align-middle">
                        <button
                          title="Edit"
                          className=" bg-slate-800 p-2 text-white rounded-md"
                          onClick={() => {
                            setUpdateId(drug.id);
                            setuName(drug.name);
                            setuUnitPrice(drug.unitPrice);
                            setuQuantity(drug.quantity);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </button>
                        <button
                          title="Delete"
                          onClick={() => handleDeleteDrug(drug.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-red-600 h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </button>
                      </td>
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

export default Admin;
