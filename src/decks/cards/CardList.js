import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { deleteCard, readCard } from "../../utils/api/index";

function CardList({ cards }) {
  const [activeCard, setActiveCard] = useState(0);
  const [front, setFront] = useState(true);
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortControl = new AbortController();

    const getCards = async () => {
      const response = await readCard(cardId, abortControl.signal);
      setActiveCard(() => response);
    };
    getCards();
    return () => {
      abortControl.abort();
    }
  }, [cardId])


  // flip card handler to set the handler to the back side of the card
  const flipCardHandler = () => {
    setFront(() => !front);
  };

  const nextCardHandler = () => {
    if (activeCard === cards.length - 1) {
      window.confirm(
        "Click 'Ok' to restart the deck or 'Cancel' to return to the home page."
      )
        ? setActiveCard(() => 0)
        : history.push("/");
    } else {
      setActiveCard((activeCard) => activeCard + 1);
      setFront(() => front);
    }
  };


  /*
  const cardListing = cards.map((card) => (
    <div>
      <div className="col">{card.front}</div>
      <div className="col">{card.back}</div>
      <div className="btn-group">
          <Link to={`/decks/${deckId}/cards/${cardId}/edit`} className="btn btn-secondary mr-2">Edit</Link>
          <button className="btn btn-danger" onClick={deleteCardHandler}>Delete</button>
      </div>
    </div>
    
  ));
  */

 

  
  if (cards.length <= 2) {
    return (
      <div>
        <h3>Not enough cards.</h3>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          + Add Cards
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <div className="card-body">
            <h4 className="card-title">Card {activeCard + 1} of {cards.length}</h4>
            <p>{front ? cards[activeCard].front : cards[activeCard].back}</p>
            <button className="btn btn-secondary ml-2" onClick={flipCardHandler}>Flip</button>
            {front ? null : (<button className="btn btn-primary ml-2" onClick={nextCardHandler}>Next</button>)}
        </div>
      </div>
    );
  }
  /*
  // create a variable which handles the history of the "Next" button and displaying the info of the next card
  
    const nextCard = () => {
        // if the amount of cards are 2 or less cards then display the message there's not enough cards otherwise go to the next card or if at the end of the cards length then prompt to restart the deck
        if (!deck || !deck.cards ||deck.cards.length <= 2 ) {
            return (
                <div>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                <button className='btn btn-primary'>
                    <Link to={`/decks/${deckId}/cards/new`} >
                        + Add Card
                    </Link>
                </button>
                </div>
            );
        } else if (deck.cards.findIndex() < deck.cards.length - 1) {
            setCards((activeCard) => activeCard + 1);
            setFlip(() => flip);
        } else {
            window.confirm(`Restart cards?\n Click "cancel" to return to the home page.`);

        }
    };




    return (
        <>
        {nextCard()}
        <button className='btn btn-secondary' onClick={flipCard}>
            Flip
        </button>
        <button className='btn btn-primary ml-2' onClick={nextCard}>
            Next
        </button>
        </>
    
    )
    */
}

export default CardList;
