const BaseCommand = require('../../utils/structures/BaseCommand');

const jantickStaff = require('../../scheams/jantickStaff-schema')

module.exports = class SetStaffCommand extends BaseCommand {
  constructor() {
    super('setstaff', 'Admin', []);
  }

  async run(client, message, args) {
    if(!message.member.roles.cache.find(role => role.id === '778566475489083432') && !message.member.roles.cache.find(role => role.id ==='771678863410987018'))  {
        return message.channel.send("Administration commands are restriced to Jantick Admins with `Type 3 Access`")
      } else {
    
    const User = message.guild.members.cache.get(args[0])
    
    if(!User) return message.channel.send('User is not valid.')

    jantickStaff.findOne({ id : User.user.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            message.channel.send(`**${User.displayName}** has already been added as a staff member.`)
        } else {
            data = new jantickStaff({ id : User.user.id })
            data.save()
            .catch(err => console.log(err))
        message.channel.send(`**${User.user.tag}** has been added as a staff member`)
        
        let role = message.guild.roles.cache.find(role => role.name === "Jantick Staff");
        
        User.roles.add(role)
        }
       
    })
 }
  }
}