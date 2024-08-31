const Menu = require("./models/MenuItem"); // Import the Menu model

const menuData = {
  items: [
    {
      id: 1,
      name: "Special Tea",
      image: "https://via.placeholder.com/150",
      rate: 30.0,
    },
    {
      id: 2,
      name: "Coffee",
      image: "https://via.placeholder.com/150",
      rate: 40.0,
    },
    {
      id: 3,
      name: "Samosa",
      image: "https://via.placeholder.com/150",
      rate: 15.0,
    },
    {
      id: 4,
      name: "Pakoda",
      image: "https://via.placeholder.com/150",
      rate: 10.0,
    },
    {
      id: 5,
      name: "Jalebi",
      image: "https://via.placeholder.com/150",
      rate: 20.0,
    },
  ],
};

const menu = new Menu(menuData);

menu
  .save()
  .then(() => console.log("Menu saved successfully!"))
  .catch((err) => console.error("Error saving menu:", err));
