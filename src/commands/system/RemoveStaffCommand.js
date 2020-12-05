const BaseCommand = require('../../utils/structures/BaseCommand');

const jantickStaff = require('../../scheams/jantickStaff-schema')

module.exports = class RemoveStaffCommand extends BaseCommand {
  constructor() {
    super('removestaff', 'Admin', []);
  }

  async run(client, message, args) {
    if(!message.member.roles.cache.find(role => role.id === '778566475489083432') && !message.member.roles.cache.find(role => role.id ==='771678863410987018'))  {
      return message.channel.send("Administration commands are restriced to Jantick Admins with `Type 3 Access`")
    }
    const User = message.guild.members.cache.get(args[0])
    if(!User) return message.channel.send('User is not valid.')

    jantickStaff.findOne({ id : User.user.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
           await jantickStaff.findOneAndDelete({ id : User.user.id })
            .catch(err => console.log(err))
            message.channel.send(`**${User.displayName}** has been removed from staff team.`)
        } else {
           message.channel.send(`**${User.displayName}** is not a staff member.`)
           let role = message.guild.roles.cache.find(role => role.name === "Jantick Staff");

           User.roles.remove(role)
        }
       
    })
  }
}