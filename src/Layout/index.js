import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../decks/CreateDeck";
import Home from "../decks/Home";
import { Route, Switch } from "react-router-dom";
import Study from "../decks/Study";
import Deck from "../decks/Deck";
import AddCard from "../decks/cards/AddCard";
import EditCard from "../decks/cards/EditCard";
import EditDeck from "../decks/EditDeck";

function Layout() {
  const [deckSize, setDeckSize] = useState(0);
  const updateDecks = (newDecks) => {
    setDeckSize(() => deckSize + newDecks);
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home updateDecks={updateDecks} deckSize={deckSize} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard updateDecks={updateDecks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
