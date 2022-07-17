import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Axios from "axios";
import CreateNewForm from "./components/CreateNewForm";
import CatCard from "./components/CatCard";

function App() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    async function go() {
      const response = await Axios.get("/api/cats");
      setCats(response.data);
    }
    go();
  }, []);

  /*
Now if we got to "localhost:3000/admin" we will see:
A nice looking admin dashboard
*/

  // Custom style for the Cat Card
  const catCard = {
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px 30px"
  };

  return (
    <div className="container">
      <p>
        <a href="/">&laquo; Back to public homepage</a>
      </p>
      <CreateNewForm setCats={setCats} />
      <div style={catCard}>
        {cats.map(function (cat) {
          return (
            <CatCard
              key={cat._id}
              name={cat.name}
              breed={cat.breed}
              photo={cat.photo}
              id={cat._id}
              setCats={setCats}
            />
          );
        })}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("app")); // We will need to pass the id that we provided into the div of "admin.ejs" file
root.render(<App />); // We need to pass our App component into the render() method
