module.exports.run = (client) => {
  client.on("messageCreate", (message) => {
    switch (message.content) {
      case "!DVFL welcome channel":
        if (message.deletable) message.delete();
        const guild = message.guild;
        require("../textChannel/welcome/index").run(guild);
        break;

      default:
        break;
    }
  });
};
