import React, { useState, useEffect } from "react";
import CardForm from "./CardForm";
import { updateCard, readDeck, readCard } from "../../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";

function EditCard({ updateDecks }) {
  // the deck with an empty array as an initial state
  const [deck, setDeck] = useState([]);
  // bringing in the deckId and the card ID's from API
  const { deckId, cardId } = useParams();
  // using the history for navigation
  const history = useHistory();
  // card as an object with a front, back, and deckId as inital use state
  const [card, setCard] = useState({ front: "", back: "", deckId: "" });


  // useEffect to make API call to retrieve the deck's details and unique id
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


  // useEffect to make API call to retreive card details and ids
  useEffect(() => {
    const abortControl = new AbortController();

    const cardDetails = async () => {
      const response = await readCard(cardId, abortControl.signal);
      setCard(() => response);
    };
    cardDetails();

    return () => {
      abortControl.abort();
    };
  }, [cardId]);
  

  // creating a modify card
  
  const modifyCard = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    await updateCard(card);
    history.push(`/decks/${deckId}`);
    updateDecks(1);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb d-flex bg-light justify-content-start">
          {""}
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">Edit Card</li>
        </ol>
      </nav>

      <div className="pl-2">
        <h2>Edit Card</h2>
      </div>
      <CardForm 
        cardDetails={card}
        modifyCard={modifyCard}
        submitCard={submitHandler}
        deckId={deckId}
      />
    </div>
  );
}

export default EditCard;
