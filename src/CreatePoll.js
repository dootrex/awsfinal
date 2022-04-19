import React, { createElement, useEffect, useState } from "react";
import * as amplify from "./amplify";

export default function CreatePoll() {
  const [title, setTitle] = useState("");
  const [inputFields, setInputFields] = useState([{ option: "" }]);

  async function submitForm(event) {
    event.preventDefault();
    const result = await amplify.makePoll(title, inputFields);
    console.log(result);
  }
  function handleFormChange(index, event) {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }
  function addFields(event) {
    event.preventDefault();
    let newfield = { option: "" };
    setInputFields([...inputFields, newfield]);
  }
  return (
    <div>
      <form>
        <label htmlFor="question">Poll Title</label>
        <input
          type="text"
          name="question"
          onChange={(e) => setTitle(e.target.value)}
        />
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name="option"
                placeholder="option"
                value={input.option}
                onChange={(event) => handleFormChange(index, event)}
              />
            </div>
          );
        })}
        <button onClick={addFields}>+</button>
        <button onClick={submitForm}>Submit Poll</button>
      </form>
    </div>
  );
}
