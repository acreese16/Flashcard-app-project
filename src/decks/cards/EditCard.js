import React, { useState, useEffect } from "react";
import CardForm from "./CardForm";
import { updateCard, readDeck, readCard } from "../../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";

function EditCard({ updateDecks }) {
  const [deck, setDeck] = useState([]);
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({ front: "", back: "", deckId: "" });
  const [existingCard, setExistingCard] = useState({});

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

  useEffect(() => {
    const abortControl = new AbortController();

    const cardAPIInfo = async () => {
      const response = await readCard(cardId, abortControl.signal);
      setExistingCard(() => response);
    };
    cardAPIInfo();

    return () => {
      abortControl.abort();
    };
  }, [cardId]);

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

  const updateForm = ({ target }) => {
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
            <Link to={`/decks/${deckId}`}>Deck Name</Link>
          </li>
          <li className="breadcrumb-item">Edit Card</li>
        </ol>
      </nav>

      <div className="pl-2">
        <h2>Edit Card</h2>
      </div>
      <CardForm 
        cardDetails={existingCard}
        modifyCard={updateForm}
        submitCard={submitHandler}
        deckId={deckId}
      />
    </div>
  );
}

export default EditCard;
