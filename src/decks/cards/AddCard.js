import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';

export default function AddCard() {
    const [deck, setDeck] = useState([]);
    // creating use State  default for new cards that are created to the flashcard deck
    const [cardDetails, setCardDetails] = useState({front: "", back: "", deckId: ""});
    // set the deck id to the parameters that get added to the value as a unique id
    const {deckId} = useParams();

    // creating a Use Effect to asynchronous callback code to run the code and abort the api call and creates a new deckId
    useEffect(() => {
        const abortControl = new AbortController();

        const cardInfo = async () => {
            const response = await readDeck( deckId, {signal: abortControl.signal});

            const infoFromAPI = await response.json();
            setDeck(infoFromAPI);
        }

        cardInfo();

        return () => {
            abortControl.abort();
        }
    }, [deckId]);

    // create a variable that updates the card if there is a change
    const updateCard= ({target}) => {
        setCardDetails({...cardDetails, [target.name]: target.value});
    };

    // create 
    
    
    return (
        <div>
            
        </div>
    )
}
