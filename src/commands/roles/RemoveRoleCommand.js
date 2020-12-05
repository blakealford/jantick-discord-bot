const BaseCommand = require('../../utils/structures/BaseCommand');

const { MessageEmbed, Message } = require('discord.js')
const colours = require('../../json/colors.json')

module.exports = class RemoveRoleCommand extends BaseCommand {
  constructor() {
    super('removerole', 'Roles', []);
  }

  async run(client, message, args) {

    if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("Command restricted to Server Staff");

    let member = getMemberFromMention(args[0]) 

    if (!member) return message.channel.send("I couldn't find that user");

    let role = getRoleFromMention(args[1])

    if (!role) return message.channel.send("That role doesn't exist, please mention a valid role.");
    if (!member.roles.cache.find(rol => rol.id === role.id)) return message.channel.send("That member doesn't have that role.");
    await member.roles.remove(role.id);

    const addedRoleEmbed = new MessageEmbed()
    .setColor(colours.GreenColour)
    .addField('Affirmative',`${role.name} has been removed from ${member.displayName}`)
    
    message.channel.send(addedRoleEmbed);

  }
}
