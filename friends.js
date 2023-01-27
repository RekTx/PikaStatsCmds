module.exports = {
    name: 'friends',
    aliases: ['fr', 'fl', 'f', 'friend'],
    cooldown: 10,
    permissions: [],
    description: 'shows friends of player',
    execute(message, args, cmd, client, Discord) {

        let playerIGN = args[0];
        let friendAmount = args[1];

        if (!playerIGN) return message.channel.send("\`!friends <IGN>\`");
        if (!friendAmount) friendAmount = 25;
        else if (friendAmount.toLowerCase() != "all") return message.channel.send("**Error:** !fl \`IGN\` \`all(optional\`");
        else friendAmount = "all";

        const profileAPI = `https://stats.pika-network.net/api/profile/${playerIGN}`;

        //console.log(profileAPI);

        fetch(profileAPI).then((isData) => {
            return isData.json();
        }).then((objectedData) => {

            let amountFriend;
            try {
                amountFriend = objectedData.friends.length;
            } catch (error) {
                amountFriend = 0;
            }

            //if (!amountFriend > 0) return console.log('addda');

            let friendEmbed = new Discord.MessageEmbed()
                .setTitle(`${playerIGN}'s friend list`)
                .setDescription(`Amount: ${amountFriend}`)
                .setThumbnail(`https://crafthead.net/avatar/${playerIGN}`)
                .setFooter('#BloodLustForLife');


            let friendsName = "";

            if (friendAmount == "all") {

                for (let i = 0; i < amountFriend; i++) {
                    friendsName = friendsName + `  \`${objectedData.friends[i].username}\``;
                }

                friendEmbed.setDescription(`Amount: ${amountFriend} \n${friendsName}`);


                message.channel.send(friendEmbed);

            } else {

                if (amountFriend < friendAmount) friendAmount = amountFriend;

                for (let i = 0; i < friendAmount; i++) {

                    friendEmbed.addField(`${objectedData.friends[i].username}`, `Online: ${objectedData.friends[i].online}`, true);

                }

                message.channel.send(friendEmbed);
            }

        }).catch(res => {
            message.channel.send("**🛑Error: Player not found**");
            //console.log(res.message);
        });

    }
}