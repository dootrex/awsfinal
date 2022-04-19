import React, { useEffect, useState } from "react";
import * as amplify from "./amplify";
import STOCKIMAGE from "./noImage.jpg";
import CreatePoll from "./CreatePoll";
import YourPolls from "./YourPolls";

export default function Profile() {
  const [file, setFile] = useState();
  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = async (event) => {
    event.preventDefault();
    const result = await amplify.uploadImage(file);
    setImgUrl(result);
  };
  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const deleteImage = (event) => {
    event.preventDefault();
    amplify.deleteImage(imgUrl);
    getProfilePic();
  };
  async function getProfilePic() {
    const result = await amplify.getImage();
    setImgUrl(result);
  }

  useEffect(() => {
    getProfilePic();
  }, []);

  return (
    <div>
      <form onSubmit={uploadImage}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button type="submit">Add Image</button>
      </form>

      {imgUrl.length > 0 ? (
        <>
          <button onClick={deleteImage}>Delete Profile Image</button>
          <img src={imgUrl}></img>
        </>
      ) : (
        <img src={STOCKIMAGE}></img>
      )}
      <CreatePoll />
      <YourPolls />
    </div>
  );
}
