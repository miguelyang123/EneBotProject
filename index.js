import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
import brain from "brain.js";
const net = new brain.recurrent.LSTM({
  // create a new neural net.
  activation: "leaky-relu", // use this activation because. :)
});
import { Ene } from "./Ene.js";

config();

// allow  Channel
const BOT_CHANNEL = ["1083661157342134363", "1083280839376384082"];
const BOT_CATEGORY = "1083400573530951750";
// const ENE_ID ="1083258292719058944"

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
  net.fromJSON(
    JSON.parse(fs.readFileSync("Ene_Memory/neuralnet.json", "utf8"))
  );
  console.log(
    `\x1b[36m${client.user.tag.split("#")[0]}\x1b[0m` + "が起きました！"
  );
  Ene.sayGoodMorning();
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
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

  if (msg.content.toLocaleLowerCase() === "ene") {
    msg.channel.send(`${user} 叫我嗎?`);
  }

  if (msg.content === "エネ") {
    msg.channel.send(`${user} 呼んた?`);
  }

  if (msg.content === "Ene自我介紹一下") {
    msg.channel.send(`
  你好呀！${user}！
  我是目隱團NO.6的Ene！
  從主人的電腦那邊跑過來的唷！！
  對於我這個超級漂亮電腦美少女Ene來說
  只要有網路的地方、不管哪裡都可以去唷！
  `);
  }

  if (msg.content === "エネ自己紹介して") {
    msg.channel.send(`
  こんにちはっ！${user}！
  メカクシ団NO.6エネです！
  ご主人のパソコンからやってきましたっ！！
  ネットワークがあれば、
  この私、スーパープリティー電脳ガール エネちゃんがどこでも行けるよ！
  `);
  }

  if (msg.content === "who") {
    msg.channel.send(`${msg.author}`);
    console.log(msg.author);
  }
  if (msg.content === "Ene 你的基本資訊") {
    msg.channel.send(`
  名字	Ene
  目隱團團員	No.6
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
  }

  if (msg.content === "Eneのプロフィール") {
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
  }

  if (msg.content === "Ene你說對吧?") {
    msg.channel.send(`說的沒錯!!`);
  }
  if (msg.content === "ene晚安") {
    msg.channel.send(`${user}晚安!!`);
  }

  //AI-Chat-bot
  if (
    msg.channel.id === "1083668931111305298" ||
    msg.channel.id === "1083661157342134363" ||
    msg.channel.id === "1084109053053108374"
  ) {
    var words = msg.content;

    // remove everything but letters.
    var sentence = words.replace(/[^a-zA-Z ]+/g, "").toLowerCase();

    // sends the reply to the channel.
    msg.channel.send(reply(net.run(sentence)));
  }
});

/******************************************\
| Response Arrays                          |
| These lists can be added to for more     |
| randomness in the responses.             |
\******************************************/
var hello_reply = ["hi", "sup?", "yo", "hello"];
var bye_reply = ["bye", "cya", "good bye"];
var lol_reply = ["lol", "lmao", "heh", "funny"];
var weather_reply = [
  "yes what a nice day it is today",
  "how is it outside where you are?",
  "thats perfect weather",
];
var yes_reply = ["thats the spirit", "ok then", "i agree"];
var no_reply = ["why not?", "NO!", "YES!", "ok then"];
var help_reply = [
  "id help you but im just a bot",
  "is there anyone who can assist?",
  "Id like to help.",
];

/*******************************************\
| This function takes the output of the ANN |
| and returns a random reply string based   |
| on that topic. If there is no match it    |
| returns a thinking emoji.                 |
\*******************************************/
const reply = (intent) => {
  // the the intent is blank for some reason, return a thinking emoji.
  if (intent === "") return ":thinking:";

  // used to build a return sentence.
  var retstr = "";

  // the neural net will generate a number between 1-8
  // which should correspond to a topic.
  // if it doesn't recognise the intent for some reason
  // it will return a thinking emoji.
  switch (parseInt(intent)) {
    case 1:
      retstr = hello_reply[Math.floor(Math.random() * hello_reply.length)];
      break;
    case 2:
      retstr = bye_reply[Math.floor(Math.random() * bye_reply.length)];
      break;
    case 3:
      retstr = lol_reply[Math.floor(Math.random() * lol_reply.length)];
      break;
    case 4:
      retstr = weather_reply[Math.floor(Math.random() * weather_reply.length)];
      break;
    case 5:
      retstr = yes_reply[Math.floor(Math.random() * yes_reply.length)];
      break;
    case 6:
      retstr = no_reply[Math.floor(Math.random() * no_reply.length)];
      break;
    case 7:
      retstr = greeting();
      break;
    case 8:
      retstr = help_reply[Math.floor(Math.random() * help_reply.length)];
      break;
    default:
      retstr = ":thinking:";
      break;
  }

  return retstr;
};

/******************************************\
| Builds a random greeting reply.          |
\******************************************/
const greeting = () => {
  var terms = ["how are you?", "hows it going?", "how are you doing?"];
  var str = "";
  str += terms[Math.floor(Math.random() * terms.length)] + " ";

  if (Math.random() >= 0.8) {
    str += "I dont know about ";
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        str += "everyone else but ";
        break;
      case 1:
        str += "you but ";
        break;
      case 2:
        str += "them but ";
        break;

      default:
        break;
    }
  }

  str += "im ";

  if (Math.random() >= 0.7) {
    var things = ["feeling ", "doing ", "being ", "genuinely "];
    str += things[Math.floor(Math.random() * things.length)];
  }

  var feelings = [
    "great. ",
    "playful. ",
    "calm. ",
    "confident. ",
    "courageous. ",
    "peaceful. ",
    "tragic. ",
    "neutral. ",
    "anxious. ",
    "pained. ",
    "wary. ",
  ];

  str += feelings[Math.floor(Math.random() * feelings.length)];

  if (Math.random() >= 0.8) {
    var reasons = ["for some reason ", "just because ", "becasue i can "];
    str += reasons[Math.floor(Math.random() * reasons.length)];

    if (Math.random() >= 0.5) {
      str += "thanks for asking. ";
    } else {
      str += ". ";
    }
  }
  return str;
};
