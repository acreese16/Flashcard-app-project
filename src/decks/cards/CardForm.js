import React from "react";
import { Link } from "react-router-dom";

function CardForm({ submitCard, modifyCard, cardDetails, deckId }) {
  return (
    <form onSubmit={submitCard}>
      <fieldset>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            name="front"
            id="front"
            rows={3}
            className="form-control"
            value={cardDetails.front}
            onChange={modifyCard}
            placeholder="Front side of card"
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            name="back"
            id="back"
            rows={3}
            className="form-control"
            value={cardDetails.back}
            onChange={modifyCard}
            placeholder="Back side of card"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mr-2"
          onClick={submitCard}
        >
          Save
        </button>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Done
        </Link>
      </fieldset>
    </form>
  );
}

export default CardForm;
