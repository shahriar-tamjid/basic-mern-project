import React, { useState, useEffect } from "react";
import {createRoot} from "react-dom/client";
import Axios from "axios";

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

Hello, Admin!
This is from React.
Hi, my name is Dustin and I am a Birman.

Hi, my name is Steve and I am a Manie Coon.

Hi, my name is Max and I am a Turkish Angora.
*/

    return (
        <div>
            <h1>Hello, Admin!</h1>
            <h4>This is from React.</h4>
            {cats.map(function(cat) {
                return <CatCard name={cat.name} breed={cat.breed} />
            })}
        </div>
    )
}

// Creating the CatCard component here
function CatCard(props) {
    return <p>Hi, my name is {props.name} and I am a {props.breed}.</p>
}

const root = createRoot(document.getElementById("app")); // We will need to pass the id that we provided into the div of "admin.ejs" file
root.render(<App />); // We need to pass our App component into the render() method
