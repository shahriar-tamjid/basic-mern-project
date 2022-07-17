import Axios from "axios";
import React, { useState } from "react";

function CatCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [file, setFile] = useState();
  const [draftBreed, setDraftBreed] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    setIsEditing(false);
    props.setCats((prev) =>
      prev.map(function (cat) {
        if (cat._id == props.id) {
          return { ...cat, name: draftName, breed: draftBreed };
        }
        return cat;
      })
    );
    const data = new FormData();
    if (file) {
      data.append("photo", file);
    }
    data.append("_id", props.id);
    data.append("name", draftName);
    data.append("breed", draftBreed);
    const newPhoto = await Axios.post("/update-cat", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (newPhoto.data) {
      props.setCats((prev) => {
        return prev.map(function (cat) {
          if (cat._id == props.id) {
            return { ...cat, photo: newPhoto.data };
          }
          return cat;
        });
      });
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        {isEditing && (
          <div className="our-custom-input">
            <div className="our-custom-input-interior">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control form-control-sm"
                type="file"
              />
            </div>
          </div>
        )}
        <img
          src={
            props.photo ? `/uploaded-photos/${props.photo}` : "/fallback.png"
          }
          className="card-img-top"
          alt={`${props.breed} named ${props.name}`}
        />
      </div>
      <div className="card-body">
        {!isEditing && (
          <>
            <h4 className="card-title">{props.name}</h4>
            <p className="card-text">{props.breed}</p>
            {!props.readOnly && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setDraftName(props.name);
                    setDraftBreed(props.breed);
                    setFile("");
                  }}
                  className="btn btn-md btn-primary"
                >
                  Edit
                </button>{" "}
                <button
                  onClick={async () => {
                    const test = Axios.delete(`/cat/${props.id}`);
                    props.setCats((prev) => {
                      return prev.filter((cat) => {
                        return cat._id != props.id;
                      });
                    });
                  }}
                  className="btn btn-md btn-outline-danger"
                >
                  Delete
                </button>
              </>
            )}
          </>
        )}
        {isEditing && (
          <form onSubmit={submitHandler}>
            <div className="mb-1">
              <input
                autoFocus
                onChange={(e) => setDraftName(e.target.value)}
                type="text"
                className="form-control form-control-sm"
                value={draftName}
              />
            </div>
            <div className="mb-2">
              <input
                onChange={(e) => setDraftBreed(e.target.value)}
                type="text"
                className="form-control form-control-sm"
                value={draftBreed}
              />
            </div>
            <button className="btn btn-md btn-success">Save</button>{" "}
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-md btn-outline-secondary"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CatCard;
