const SlackBot = require("slackbots");
const axios = require("axios");

var bot = new SlackBot({
  token: "xoxb-384555602977-385243383157-MhdiS6h49MgWyrMX1s46SQ3b",
  name: "JokeBot"
});

//Start Handler

bot.on("start", () => {
  const params = {
    icon_emoji: ":smiley:"
  };

  bot.postMessageToChannel(
    "general",
    "Get ready to laugh with @JokeBot!",
    params
  );
});

//Error Event

bot.on("error", err => console.log("Error"));

//Message Handler

bot.on("message", data => {
  if (data.type !== "message") {
    return;
  } else {
    handleMessage(data.text);
  }
});

//Respond to data
function handleMessage(message) {
  if (message.includes(" chucknorris")) {
    chuckJoke();
  } else if (message.includes(" yomama")) {
    yoMama();
  } else if (message.includes(" random")) {
    randomJoke();
  } else if (message.includes(" help")) {
    runHelp();
  }
}

//Tell a Chuck Norris joke
function chuckJoke() {
  axios.get("http://api.icndb.com/jokes/random/").then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ":laughing:"
    };
    bot.postMessageToChannel("general", `Chuck Norris: ${joke}.`, params);
  });
}

//Tell a Yo Mama joke
function yoMama() {
  axios.get("http://api.yomomma.info").then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ":laughing:"
    };

    bot.postMessageToChannel("general", `Yo Mama: ${joke}.`, params);
  });
}

//Tell a Random joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;

  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMama();
  }
}

//Show help text
function runHelp() {
  const params = {
    icon_emoji: ":question:"
  };

  bot.postMessageToChannel(
    "general",
    `Type @JokeBot with either 'chucknorris', 'yomama', or 'random' to get a joke.`,
    params
  );
}
