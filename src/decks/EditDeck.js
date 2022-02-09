import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck({ updateDecks }) {
    // creating an initial state of an empty deck as a default
  const [deck, setDeck] = useState({ name: "", description: "" });
  // utilizing the parameters for the deckId
  const { deckId } = useParams();
  const history = useHistory();

  // useEffect API call to read the deck and return back the correct deck
  useEffect(() => {
    const abortControl = new AbortController();

    const deckDetails = async () => {
      const response = await readDeck(deckId, abortControl.signal);
      setDeck(() => response);
    };
    deckDetails();

    return () => {
      abortControl.abort();
    };
  }, [deckId]);

  //modifying the deck and the values in the deck
  const modifyDeck = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value });
  };

  // submit deck handler when you edit an existing deck
  const submitDeck = async (event) => {
    event.preventDefault();

    const response = await updateDeck(deck);
    history.push(`/decks/${response.id}`);
    updateDecks(1);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light pt-2 d-flex">
          {""}
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item" aria-label="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <div>
        <h3>Edit Deck</h3>
      </div>
        <div>
          <form onSubmit={submitDeck}>
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                id="name"
                type="text"
                value={deck.name}
                onChange={modifyDeck}
                placeholder={deck.name}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                id="desscription"
                value={deck.description}
                onChange={modifyDeck}
                placeholder={deck.description}
                rows={3}
                className="form-control"
              />
            </div>
            <Link
              to={`/decks/${deckId}`}
              className="btn btn-secondary mr-2"
              name="cancel"
            >
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
  );
}

export default EditDeck;