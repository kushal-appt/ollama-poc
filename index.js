import { ChatOllama } from "@langchain/ollama";
import fs from 'fs';
import path from "path";

const llm = new ChatOllama({
  model: "tinyllama",
  temperature: 0,
  maxRetries: 2,
});

const humanMessage = "Can you help me in setup of typescript project?";

const aiFileNameObj = await llm.invoke([
  [
    "system",
    "You are a helpful assistant that answers questions and provides coding help.",
  ],
  ["human", `Can you give one word for the filename based on this content: ${humanMessage}`],
]);

const aiMsg = await llm.invoke([
  [
    "system",
    "You are a helpful assistant that answers questions and provides coding help.",
  ],
  ["human", humanMessage],
]);

const filenameToBe = aiFileNameObj.content.split(":")[1]

const filename = `${filenameToBe}.txt`;
fs.writeFile(path.join('./chats', filename), aiMsg.content, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log(`Message written to ${filename} successfully!`);
  }
});