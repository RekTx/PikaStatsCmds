module.exports = {
    name:'profile',
    aliases: ['p', 'pr'],
    cooldown: 5,
    permissions: [],
    description: 'shows player pika profile',
    execute (message, args, cmd, client, Discord) {

        let playerIGN = args[0];

        if (!playerIGN) return message.channel.send("\`!profile <IGN>\`");

        const profileAPI = `https://stats.pika-network.net/api/profile/${playerIGN}`;
 

        fetch(profileAPI).then((isData) => {
            return isData.json();
        }).then((objectedData) => {

            // try {
            //     let name = objectedData.username;
            // } catch (error) {
            //     return message.channel.send("**🛑Error: Player not found**");
            // }

            //console.log('1');
            let playerGuild, playerRank;
            try {
                playerGuild = objectedData.clan.name;
            } catch (error) {
                playerGuild = "No Guild";
            }

            //console.log('2');

            try {
                playerRank = objectedData.ranks[0].displayName;
            } catch (error) {
                playerRank = "NON";
            }

            //console.log('3');

            let guildOwner, guildMemAm, guildLevel, guildTag;
            try {
                guildOwner = objectedData.clan.owner.username;
            } catch (error) {
                guildOwner = "None";
            }

            try {
                guildMemAm = objectedData.clan.members.length;
            } catch (error) {
                guildMemAm = "0";
            }

            try {
                guildLevel = objectedData.clan.leveling.level;
            } catch (error) {
                guildLevel = "0";
            }

            try {
                guildTag = objectedData.clan.tag
            } catch (error) {
                guildTag = " ";
            }

            let profileEmbed = new Discord.MessageEmbed()
            .setTitle(`${objectedData.username} (${guildTag})`)
            .setDescription(`Pika Network Profile of ${playerIGN}`)
            .setFooter("#BloodLustForLife")
            .setThumbnail(`https://crafthead.net/avatar/${playerIGN}`)
            .setColor("Random")
            .addField(`**Level:** ${objectedData.rank.level}`, `${objectedData.rank.percentage} completed.`, true)
            .addField(`**Rank:** ${playerRank}`, 'On Minigames', true)
            .addField(`**Status:** ${objectedData.friendStatus}`, 'Current friendly status', true)
            .addField(`**Linked Email:** ${objectedData.email_verified}`, true)
            .addField(`**Linked Discord:** ${objectedData.discord_verified}`, true)
            .addField(`**Friends:** ${objectedData.friends.length}`, 'Amount of friends', true)
            .addField(`**Guild:** ${playerGuild}`, `Owner:\`${guildOwner}\` Members: \`${guildMemAm}\` Level: \`${guildLevel}\``, true)

            message.channel.send(profileEmbed);

        }).catch(res => {
            message.channel.send("**🛑Error: Player not found**");
            //console.log(res.message);
        });

    }
}