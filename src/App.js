import Amplify, { API, Storage } from "aws-amplify";
import Profile from "./Profile";
import "@aws-amplify/ui-react/styles.css";
import { Button, Authenticator } from "@aws-amplify/ui-react";
import "./App.css";
import * as amplify from "./amplify";

function App() {
  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <div className="loggedIn">
            <Button onClick={signOut}>Sign Out Yo!</Button>
            <Profile></Profile>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
