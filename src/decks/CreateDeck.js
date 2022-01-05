import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {

  // create use state variable for the new deck which will be created with an empty name and description
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });
  // create a history function to be able to toggle between previous pages
  const history = useHistory();

  // creating a variable that updates a new deck with a target value and name this variable handles the changes of the form 
  const updateDeck = ({ target }) => {
    setNewDeck({ ...newDeck, [target.name]: target.value });
  };

  // create submit handler that creates a new deck and updates the home page with the new deck
  const submitDeck = async (event) => {
    event.preventDefault();

    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
    updateDeck();
  };

  

  return (
      <>
      <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
              <li className="breadcrumb-item">
                  <Link to={`/`}>
                      Home
                  </Link>
              </li>
              <li className="breadcrumb-item active" aria-label="page">
                  Create Deck
              </li>
          </ol>
      </nav>
      <form onSubmit={submitDeck}>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" className="form-control" value={newDeck.name} onChange={updateDeck} placeholder="Deck Name" />
              </div>
              <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea name="description" id="description" rows={4} className="form-control" value={newDeck.description} onChange={updateDeck} placeholder="Brief description of the deck" />
              </div>
              <button type="submit" className="btn btn-primary mr-2" onClick={submitDeck}>
                  Submit
              </button>
              <Link to={`/`} className="btn btn-secondary">
                  Cancel
              </Link>
          </fieldset>
      </form>
      </>
  )
  
}

export default CreateDeck;
