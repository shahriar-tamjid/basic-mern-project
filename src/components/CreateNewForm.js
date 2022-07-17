import Axios from "axios";
import React, { useState, useRef } from "react";

function CreateNewForm(props) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [file, setFile] = useState("");
  const CreatePhotoField = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("photo", file);
    data.append("name", name);
    data.append("breed", breed);
    setName("");
    setBreed("");
    setFile("");
    CreatePhotoField.current.value = "";
    const newPhoto = await Axios.post("/create-cat", data, {
      // Pass data using the "create-cat" route with the help of "post" method
      headers: { "Content-Type": "multipart/form-data" },
    });
    props.setCats((prev) => prev.concat([newPhoto.data]));
  }

  return (
    <form
      className="p-3 bg-success bg-opacity-25 mb-5"
      onSubmit={submitHandler}
    >
      <div className="mb-2">
        <input
          ref={CreatePhotoField}
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"
          placeholder="Cat Name"
        />
      </div>
      <div className="mb-2">
        <input
          onChange={(e) => setBreed(e.target.value)}
          value={breed}
          type="text"
          className="form-control"
          placeholder="Cat Breed"
        />
      </div>

      <button className="btn btn-success">Create New Entry!</button>
    </form>
  );
}

export default CreateNewForm;
