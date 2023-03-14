import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config({ path: "TOKEN/.env" });

import { useChatGpt } from "./useChatGPT.js";
import { Ene } from "./Ene.js";
// import { EneMind } from "./EneMind.js";

// import { ChatGPTAPI } from "chatgpt";
// import "isomorphic-fetch";
//ChatGPTAPI
// const api = new ChatGPTAPI({
//   apiKey: process.env.OPENAI_KEY,
// });

// allow  Channel
const BOT_CHANNEL = ["1083661157342134363", "1083280839376384082"];
const BOT_CATEGORY = "1083400573530951750";
// const ENE_ID ="1083258292719058944"

const ご主人 = "<@518738504138752022>";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.ENE_BOT_TOKEN;

client.login(TOKEN);

client.on("ready", () => {
  console.log(
    `\x1b[36m${client.user.tag.split("#")[0]}\x1b[0m` + "が起きました！"
  );
  Ene.sayGoodMorning();
});

client.on("messageCreate", async (msg) => {
  //Not Bot
  if (msg.author.bot) return;

  //ChatGPT
  if (
    msg.channel.id === "1084148533101351012" ||
    msg.channel.id === "1083663732858699806"
  ) {
    // const res = await api.sendMessage(msg.content);
    // console.log(res.text);
    // msg.channel.send(res.text);

    // let gptMsg = useChatGpt(msg.content);

    // msg.channel.send(gptMsg);
    msg.channel.sendTyping();
    // Send a basic message
    try {
      let timeoutID = setInterval(() => msg.channel.sendTyping(), 10000);
      let gptMsg = await useChatGpt(msg.content);
      //change name
      let eneMsg = gptMsg.replace("ChatGPT", "エネ");
      await msg.channel.send(eneMsg);
      clearInterval(timeoutID);
    } catch (err) {
      msg.channel.send(Ene.sayIsError(ご主人));
      console.log(err);
    }

    // msg.channel.sendTyping().then(() => {

    // await useChatGpt(msg.content)
    //   .then((gptMsg) => {
    //     let eneMsg = gptMsg.replace("ChatGPT", "エネ");
    //     msg.channel.send(eneMsg);
    //   })
    //   .catch((err) => {
    //     msg.channel.send(`我好像出了問題，${ご主人}快幫我更新!! :confounded: `);
    //     console.log(err);
    //   });
    // });

    // console.log(gptMsg);
  }

  if (
    msg.channel.parent.id !== BOT_CATEGORY &&
    BOT_CHANNEL.every((e) => e !== msg.channel.id)
  )
    return;
  // console.log(msg.content);
  // console.log(msg.author.tag);

  let user = msg.author.tag.split("#")[0];
  if (user === "Miguel Yang") {
    user = `主人`;
  }
  // const user = msg.author;
  // msg.channel.sendTyping();

  if (msg.content.toLocaleLowerCase() === "ene") {
    msg.channel.send(`${user} 叫我嗎?`);
  } else if (msg.content === "エネ") {
    msg.channel.send(`${user} 呼んた?`);
  } else if (msg.content === "Ene自我介紹一下") {
    msg.channel.send(`
  你好呀！${user}！
  我是目隱團NO.6的Ene！
  從主人的電腦那邊跑過來的唷！！
  對於我這個超級漂亮電腦美少女Ene來說
  只要有網路的地方、不管哪裡都可以去唷！
  `);
  } else if (msg.content === "エネ自己紹介して") {
    msg.channel.send(`
  こんにちはっ！${user}！
  メカクシ団NO.6エネです！
  ご主人のパソコンからやってきましたっ！！
  ネットワークがあれば、
  この私、スーパープリティー電脳ガール エネちゃんがどこでも行けるよ！
  `);
  } else if (msg.content === "who") {
    msg.channel.send(`${msg.author}`);
    console.log(msg.author);
  } else if (msg.content === "Ene 你的基本資訊") {
    msg.channel.send(`
  名字	Ene
  目隱團團員	No.6
  楽曲	人造エネミー、エネの電脳紀行
  能力	目が覚める
  誕生日	不明
  年齢	19歳（精神年齢）
  身長	640pxl
  体重	2MB
  喜歡的電影	ゴッド◌ァーザー2、時計仕掛けのオ◌ンジ
  CV	阿澄佳奈
  代表色	青
  `);
  } else if (msg.content === "Eneのプロフィール") {
    msg.channel.send(`
  名前	榎本貴音（エネ）
  メカクシ団団員	No.6
  楽曲	人造エネミー、エネの電脳紀行
  能力	目が覚める
  誕生日	不明
  年齢	19歳（精神年齢）
  身長	640pxl
  体重	2MB
  好きな映画	ゴッド◌ァーザー2、時計仕掛けのオ◌ンジ
  CV	阿澄佳奈
  イメージカラー	青
  `);
  } else if (msg.content === "Ene你說對吧?") {
    msg.channel.send(`說的沒錯!!`);
  } else if (msg.content === "Ene晚安") {
    msg.channel.send(`${user}晚安!!`);
  } else if (msg.content.split(" ")[0] === "Ene說") {
    msg.channel.send(`${msg.content.split(" ")[1]}`);
  } else if (msg.content === "測試錯誤") {
    msg.channel.send(Ene.sayIsError(ご主人));
  }
  // else {
  //   msg.channel.send(`?`);
  // }

  //AI-Chat-bot
  // if (
  //   msg.channel.id === "1083668931111305298" ||
  //   msg.channel.id === "1083661157342134363" ||
  //   msg.channel.id === "1084109053053108374"
  // ) {
  //   // sends the reply to the channel.
  //   msg.channel.send(EneMind(msg.content));
  //   // EneMind(msg.content);
  // }
});
