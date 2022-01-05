import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import AddCard from "./decks/cards/AddCard";
import Layout from "./Layout";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
 
  return (
    <div className="app-routes">
      <Switch>
          <Layout />
        <Route path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
      </Switch>
    </div>
  );
}



export default App;
