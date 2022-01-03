import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {readDeck} from "../utils/api/index";

function Study () {
    //create a variable for the initial state of the deck to be an object
    const [deck, setDeck] = useState({});
    // get the deck's id 
    const {deckId} = useParams();

    // useEffect to get the proper deck
    useEffect(() => {
        const getDeck = async () => {
            const activeDeck = await readDeck(deckId);
            setDeck(() => activeDeck)
        }
        getDeck();

    }, [deckId])
}