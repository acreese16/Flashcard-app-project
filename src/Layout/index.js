import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../decks/CreateDeck";
import Home from "../decks/Home";
import { Route, Switch } from "react-router-dom";
import Study from "../decks/Study";
import Deck from "../decks/Deck";
import AddCard from "../decks/cards/AddCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
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
