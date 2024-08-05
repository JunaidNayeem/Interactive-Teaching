import React from "react";
import Header from "../components/Header";
import "../assets/scss/global.scss";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <h1>Boiler Plate React</h1>
      <h3>folder structure:-</h3>
      <div>React-boilerplate </div>
      <div>├── node_modules </div>
      <div>├── public </div>
      <div>│ └── vite.svg </div>
      <div>├── src </div>
      <div>│ ├──components</div>
      <div>│ ├──pages</div>
      <div>│ ├──utils</div>
      <div>│ ├──App.css </div>
      <div>│ ├── App.jsx </div>
      <div>│ ├── index.css </div>
      <div>│ └── main.jsx </div>
      <div>├── .gitignore </div>
      <div>├──index.html </div>
      <div>├── package.json </div>
      <div>├── README.md </div>
      <div>└── vite.config.js</div>
    </div>
  );
}
