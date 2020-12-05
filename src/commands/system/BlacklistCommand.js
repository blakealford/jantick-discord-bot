const BaseCommand = require('../../utils/structures/BaseCommand');
// const {sendErrorMessage} = require('../../utils/registry')
const blacklist = require('../../scheams/blacklist-shcema')
const { Message } = require('discord.js')

module.exports = class BlacklistCommand extends BaseCommand {
  constructor() {
    super('blacklist', 'Admin', []);
  }

  async run(client, message, args) {
    if(!message.member.roles.cache.find(role => role.id === '778566475489083432') && !message.member.roles.cache.find(role => role.id ==='771678863410987018'))  { // I am trouble shooting, the bot doesnt turn on 
            return message.channel.send("Administration commands are restriced to Jantick Admins with `Type 3 Access`")
          } else {
        
        const User = message.guild.members.cache.get(args[0])
        
        if(!User) return message.channel.send('User is not valid.')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(`**${User.displayName}** has already been blacklisted from using me.`)
            } else {
                data = new blacklist({ id : User.user.id })
                data.save()
                .catch(err => console.log(err))
            message.channel.send(`${User.user.tag} has been added to blacklist.`) 
            }
           
        })
     }
    }
}
