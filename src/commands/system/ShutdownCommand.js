const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ShutdownCommand extends BaseCommand {
  constructor() {
    super('shutdown', 'system', []);
  }

  run(client, message, args) {
    if(!message.member.roles.cache.find(role => role.id === '778566475489083432') && !message.member.roles.cache.find(role => role.id ==='771678863410987018'))  {
      return message.channel.send("Command restricted to Jantick Technical Team")
    }

    client.destroy();
  }
}