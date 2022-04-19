import React, { useEffect, useState } from "react";
import * as amplify from "./amplify";

export default function YourPolls() {
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    fetchPolls();
  }, []);
  async function fetchPolls() {
    const result = await amplify.fetchPolls();
    console.log(result);
    setPolls(result.Items);
  }
  async function printThing(sk) {
    const id = sk.replace("POLL#", "");
    const result = await amplify.getPoll(id);
  }
  return (
    <div>
      Polls
      {polls.map((poll) => (
        <div>
          <h1>{poll.title}</h1>
          <table>
            <tr>
              <th>Answers</th> <th>Votes</th>
            </tr>

            {Object.keys(poll.answers).map((keyName) => (
              <tr>
                <td>{keyName}</td>
                <td>{poll.answers[keyName]}</td>
              </tr>
            ))}
          </table>
          <button onClick={() => printThing(poll.SK)}>Click To scan</button>
        </div>
      ))}
    </div>
  );
}
