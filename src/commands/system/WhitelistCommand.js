const BaseCommand = require('../../utils/structures/BaseCommand');

const blacklist = require('../../scheams/blacklist-shcema')
const { Message } = require('discord.js')

module.exports = class WhitelistCommand extends BaseCommand {
  constructor() {
    super('whitelist', 'Admin', []);
  }

  async run(client, message, args) {
    if(!message.member.roles.cache.find(role => role.id === '778566475489083432') && !message.member.roles.cache.find(role => role.id ==='771678863410987018'))  {
        return message.channel.send("Administration commands are restriced to Jantick Admins with `Type 3 Access`")
      }
      const User = message.guild.members.cache.get(args[0])
      if(!User) return message.channel.send('User is not valid.')

      blacklist.findOne({ id : User.user.id }, async(err, data) => {
          if(err) throw err;
          if(data) {
             await blacklist.findOneAndDelete({ id : User.user.id })
              .catch(err => console.log(err))
              message.channel.send(`**${User.displayName}** has been removed from blacklist.`)
          } else {
             message.channel.send(`**${User.displayName}** is not blacklisted.`)
          }
         
      })
    }
  }

