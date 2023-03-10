import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { Ene } from "./Ene.js";

config();

// allow  Channel
const BOT_CHANNEL = ["1083661157342134363", "1083280839376384082"];
const BOT_CATEGORY = "1083400573530951750";

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
});
