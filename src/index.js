import React from "react";
import {createRoot} from "react-dom/client";

function App() {
    return (
        <div>
            <h1>Hello, Admin!</h1>
            <h4>This is from React.</h4>
        </div>
    )
}

const root = createRoot(document.getElementById("app")); // We will need to pass the id that we provided into the div of "admin.ejs" file
root.render(<App />); // We need to pass our App component into the render() method
