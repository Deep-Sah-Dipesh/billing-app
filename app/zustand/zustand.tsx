import create from 'zustand';

const useStore = create((set) => ({
  users: [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
  ],
  setUsers: (newUsers) => set(() => ({
    users: newUsers,
  })),
}));

export default useStore;
