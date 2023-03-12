import { config } from "dotenv";
import { ChatGPTUnofficialProxyAPI, ChatGPTAPI } from "chatgpt";
import "isomorphic-fetch";

config({ path: "TOKEN/.env" });

//ChatGPTAPI
// const api = new ChatGPTAPI({
//   apiKey: process.env.OPENAI_KEY,
// });
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: process.env.OPENAI_ACCESS_TOKEN,
});

export function useChatGpt(msg) {
  return new Promise(async (Resolve, reject) => {
    try {
      // let res = await api.sendMessage("希望你說話方式可愛一點，像朋友一樣");
      // res = await api.sendMessage(msg, {
      //   parentMessageId: res.id,
      // });

      //   console.log(res.text);
      const res = await api.sendMessage(msg);
      Resolve(res.text);
    } catch (err) {
      reject(err);
      // console.log(err);
    }
  });
}
