export interface Drug {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Sale {
  drug: string;
  quantity: number;
  unitPrice: number;
  date: string;
}

interface DatabaseSchema {
  drugs: Drug[];
  sales: Sale[];
  lastDrugId: number;
  lastSaleId: number;
}

const STORAGE_KEY = "pharmacyData";

function readDatabase(): DatabaseSchema {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initialData: DatabaseSchema = {
      drugs: [],
      sales: [],
      lastDrugId: 0,
      lastSaleId: 0,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
}

function writeDatabase(data: DatabaseSchema): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getDrugs(): Drug[] {
  const data = readDatabase();
  return data.drugs;
}

export function addDrug(drug: Omit<Drug, "id">): number {
  const data = readDatabase();
  const newId = data.lastDrugId + 1;
  const newDrug: Drug = { ...drug, id: newId };
  data.drugs.push(newDrug);
  data.lastDrugId = newId;
  writeDatabase(data);
  return newId;
}

export function updateDrug(id: number, updates: Partial<Drug>): void {
  const data = readDatabase();
  const index = data.drugs.findIndex((drug) => drug.id === id);
  if (index !== -1) {
    data.drugs[index] = { ...data.drugs[index], ...updates };
    writeDatabase(data);
  }
}

export function deleteDrug(id: number): void {
  const data = readDatabase();
  data.drugs = data.drugs.filter((drug) => drug.id !== id);
  writeDatabase(data);
}

export function addSale(sale: Sale): number {
  const data = readDatabase();
  const newId = data.lastSaleId + 1;
  const newSale: Sale = { ...sale };
  data.sales.push(newSale);
  data.lastSaleId = newId;
  writeDatabase(data);
  return newId;
}

export function getSalesForDate(date: string): Sale[] {
  const data = readDatabase();
  return data.sales.filter((sale) => sale.date === date);
}
