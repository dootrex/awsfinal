import Amplify, { API, Storage } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const apiName = "polls";

function randomString(bytes = 16) {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)))
    .map((b) => b.toString(16))
    .join("");
}

async function deleteImageFromS3(name) {
  await Storage.remove(name);
}

export async function uploadImage(file) {
  let old = await API.get(apiName, "/images");

  if (old.imageName && old.imageName.length > 0) {
    console.log("deleting image");
    console.log();
    deleteImageFromS3(old.imageName);
  }
  const imageName = randomString();
  const resultS3 = await Storage.put(imageName, file);
  const imageUrl = await Storage.get(resultS3.key);
  const path = "/images";
  const result = await API.put(apiName, path, {
    body: { imageName },
  });
  return imageUrl;
}
export async function deleteImage(name) {
  deleteImageFromS3(name);
  const path = "/images";
  const result = await API.delete(apiName, path);
  console.log(result);
  return result;
}

export async function getImage() {
  const path = "/images";
  const result = await API.get(apiName, path);
  if (result.imageName.length > 0) {
    return await Storage.get(result.imageName);
  }
  return null;
}

export async function makePoll(title, options) {
  const path = "/polls";
  const answers = {};
  options.forEach((key) => (answers[key.option] = 0));
  console.log(answers);
  const result = await API.post(apiName, path, {
    body: { title, answers },
  });
  console.log(result);
  return result;
}
export async function fetchPolls() {
  const path = "/polls";
  const result = await API.get(apiName, path);
  return result;
}
export async function getPoll(id) {
  const path = `/polls?param=${id}`;
  const result = await API.get(apiName, path);
  console.log(result);
  return "haha";
}
