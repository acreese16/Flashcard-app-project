import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard, updateCard } from "../../utils/api/index";

function AddCard() {
  const [deck, setDeck] = useState([]);
  // creating use State  default for new cards that are created to the flashcard deck
  const [cardDetails, setCardDetails] = useState({
    front: "",
    back: "",
    deckId: "",
  });
  // set the deck id to the parameters that get added to the value as a unique id
  const { deckId } = useParams();

  // creating a Use Effect to asynchronous callback code to run the code and abort the api call and creates a new deckId
  useEffect(() => {
    const abortControl = new AbortController();

    const cardInfo = async () => {
      const response = await readDeck(deckId,  abortControl.signal );

      setDeck(() => response)
    };

    cardInfo();

    return () => {
      abortControl.abort();
    };
  }, [deckId]);

  // create a variable that updates the card if there is a change
  const modifyCard = ({ target }) => {
    setCardDetails({ ...cardDetails, [target.name]: target.value });
  };

  // create a submit handler for when a new card is created
  const submitCard = (event) => {
    event.preventDefault();

    setCardDetails({ ...cardDetails, deckId: deckId });
    createCard(deckId, cardDetails);
    setCardDetails({ front: "", back: "", deckId: "" });
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/`}>Home</Link>
          </li>
          <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>
                  {deck.name}
              </Link>
          </li>
          <li className="breadcrumb-item active" aria-label="page">
              Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>    
      <form onSubmit={submitCard}>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="front">Front</label>
                  <textarea name="front" id="front" rows={3} className="form-control" value={cardDetails.front} onChange={modifyCard} placeholder="Front side of card" />
              </div>
              <div className="form-group">
                  <label htmlFor="back">Back</label>
                  <textarea name="back" id="back" rows={3} className="form-control" value={cardDetails.back} onChange={modifyCard} placeholder="Back side of card" />
              </div>
              <button type="submit" className="btn btn-primary mr-2" onClick={submitCard}>
                  Save
              </button>
              <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
                  Done
              </Link>
          </fieldset>
      </form>

    </div>
  );
}

export default AddCard;