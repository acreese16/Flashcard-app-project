import React, { useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  // create use state variable for the new deck which will be created with an empty id, name and description
  const [newDeck, setNewDeck] = useState({ id: "", name: "", description: "" });
  // create a history function to be able to toggle between previous pages
  const history = useHistory();

  // creating a variable that updates a new deck with a target value and name
  const updateDeck = ({ target }) => {
    setNewDeck({ ...newDeck, [target.name]: target.value });
  };

  const submitDeck = async (event) => {
    event.preventDefault();

    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
    updateDeck();
  };

  return (
    <div>
      <div className="row pb-2">
        <h2>Create Deck</h2>
      </div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light">
          <li className="breadcrumb-item">
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>
      <form onSubmit={submitDeck}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Deck Name"
            value={newDeck.name}
            onChange={updateDeck}
          />
        </div>
        <div className="form-group">
            <label>Description</label>
            <textarea id="description" name="description" value={newDeck.description} onChange={updateDeck} placeholder="Breif description of the deck" rows={6} />
        </div>
        <Link to={"/"} name="cancel" className="btn">
            Cancel
        </Link>
        <button type="submit">
            Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
