import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

config();

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
  console.log(`${client.user.tag.split("#")[0]} was wake up!`);
});

client.on("messageCreate", (msg) => {
  // console.log(msg.content);
  // console.log(msg.author.tag);

  const user = msg.author.tag.split("#")[0];
  // const user = msg.author;

  if (msg.content.toLocaleLowerCase() === "ene") {
    msg.channel.send(`${user} 主人叫我嗎?`);
  }

  if (msg.content === "エネ") {
    msg.channel.send(`${user} ご主人呼んた?`);
  }

  if (msg.content === "Ene自我介紹一下") {
    msg.channel.send(`你好呀！${user}！
我是目隱團NO.6的Ene！
從主人的電腦那邊過來的唷！！
只要有網路的地方
我這個超級漂亮電腦美少女 Ene哪裡都可以去唷！`);
  }

  if (msg.content === "エネ自己紹介して") {
    msg.channel.send(`こんにちはっ！${user}！
メカクシ団NO.6エネです！
ご主人のパソコンからやってきましたっ！！
ネットワークがあれば、
この私、スーパープリティー電脳ガール エネちゃんがどこでも行けるよ！`);
  }

  if (msg.content === "who") {
    msg.channel.send(`${msg.author}`);
    console.log(msg.author);
  }
  if (msg.content === "Ene 你的基本資訊") {
    msg.channel.send(`名前	榎本貴音（エネ）
メカクシ団団員	No.6
楽曲	人造エネミー、エネの電脳紀行
能力	目が覚める
誕生日	不明
年齢	19歳（精神年齢）
身長	640pxl
体重	2MB
好きな映画	ゴッド◌ァーザー2、時計仕掛けのオ◌ンジ
CV	阿澄佳奈
イメージカラー	青`);
  }
});
