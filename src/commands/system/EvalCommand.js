const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super('eval', 'system', []);
  }

  async run(client, message, args) {
    let code = args.join(' '),
    res;

try {
    res = await new Promise((resolve, reject) => resolve(eval(code)));

    if (typeof res !== 'string') {
        res = require('util').inspect(res, { depth: 0 });
    }

    if (res.includes(process.env.TOKEN)) {
        res = res.replace(new RegExp(process.env.DISCORD_BOT_TOKEN, 'g'), '[TOK3N]');
    }

    message.channel.send(res, { split: true });
} catch (e) {
    bot.logger.error(e);
    message.channel.send("Something went wrong.");
}
  }
}