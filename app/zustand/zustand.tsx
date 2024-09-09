import create from "zustand";

const useStore = create((set) => ({
  users: [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
  ],
  cashier: "Sachin",
  number: 1,
  setUsers: (newUsers) =>
    set(() => ({
      users: newUsers,
    })),
  setCashier: (newUsers) =>
    set(() => ({
      cashier: newUsers,
    })),
  setNumber: (number) =>
    set(() => ({
      number: number,
    })),
}));

export default useStore;
