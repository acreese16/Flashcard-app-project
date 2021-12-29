import React from "react";  
import { listDecks } from "../utils/api";
import {useState} from "react";

function Home () {

    const [decks, setDecks] = useState([]);

    return (
        <p>Hello World</p>
    )

}

export default Home;