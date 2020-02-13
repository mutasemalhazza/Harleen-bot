const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');


const token = 'Njc0MjM1NzE4MTg0NDY4NDgw.Xj8hFA.XzFlUu1f5qiZKPbbVe3iwiVmNZo';

const PREFIX = '!';

bot.on('ready', () => {
    console.log('online');
})

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(channel => channel.name === "general");
    if (!channel) return;

    channel.send(`Welcome, ${member}, please make sure you pick for yourself a role from roles-for-all channel to avoid misping you and I hope you have fun here friend :))`)

});

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'kick':
            if (!message.member.roles.find(r => r.name === "Co-Leader")) return message.channel.send('you do not have the permission to kick a member')

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick('You have been kicked out of the server because the Co-leader considered you an enemy. We apologize for this and have a nice day. ').then(() => {
                        message.reply(`${user.tag} was successfully kicked`);
                    }).catch(err => {
                        message.reply('unable to kick the member');
                        console.log(err);
                    });
                } else {
                    message.reply(`That member is not in this server`)
                }
            } else {
                message.reply('please specify a person to kick')
            }

            break;
    }
});

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ban':
            if (!message.member.roles.find(r => r.name === "Co-Leader")) return message.channel.send('you do not have the permission to ban a member')

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.ban({ ression: 'You have been kicked out of the server because the Co-leader considered you an enemy. We apologize for this and have a nice day' }).then(() => {
                        message.reply(`${user.tag} was successfully banned`)
                    })
                } else {
                    message.reply(`That member is not in this server`)
                }
            } else {
                message.reply('please specify a person to ban')
            }

            break;
    }
});


bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'mute':
            
            if (!message.member.roles.find(r => r.name === "Co-Leader")) return message.channel.send('you do not have the permission to mute a member')

            let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
            if (!person) return message.reply("please specify a person to mute");

            let mainrole = message.guild.roles.find(role => role.name === "Friends");
            let muterole = message.guild.roles.find(role => role.name === "Muted");

            if (!muterole) return message.reply('Couldn not find the requested role');

            let time = args[2];

            if (!time) {
                return message.reply("you didn't specify a time");
            }

            person.removeRole(mainrole.id);
            person.addRole(muterole.id);

            message.channel.send(`You have successfully muted @${person.user.tag} for ${ms(ms(time))}`);
            setTimeout(function () {
                person.addRole(mainrole.id);
                person.removeRole(muterole.id);
                message.channel.send(`@${person.user.tag} has been unmuted welcome again ;) `)


            }, ms(time));

            break;
    }

})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'hello':
            message.channel.send('welcome dear :)')
            break;
    }
})

bot.login(process.env.token);
