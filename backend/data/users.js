import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Deepu",
    email: "deepu@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Nimak",
    email: "nimak@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;