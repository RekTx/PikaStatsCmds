module.exports = {
    name: 'skywars',
    aliases: ['sw', 'se', 'swStats'],
    cooldown: 5,
    permissions: [],
    description: '',
    execute(message, args, cmd, client, Discord) {

        // !skywars NOT_YAHYA lifetime OverAll
        let playerIGN = args[0];
        let userInterval = args[1];
        let userMode = args[2];

        let interval = "total", mode = "ALL_MODES";

        if (!playerIGN) return message.channel.send("\`!skywars <IGN> <interval> <mode>\`");

        if (userInterval) interval = userInterval.toLowerCase();
        else interval = "total";
        if (userMode) mode = userMode.toLowerCase();
        else mode = "ALL_MODES";

        if (interval === "weekly" || interval === "week") interval = "weekly";
        else if (interval === "monthly" || interval === "month") interval = "monthly";
        else if (interval === "yearly" || interval === "year") interval = "yearly";
        else if (interval === "alltime" || interval === "lifetime" || interval === "total") interval = "total";
        else return message.channel.send(`**🛑Error:** ${interval} not recoganized!`);

        if (mode === "solo" || mode === "1") mode = "SOLO";
        else if (mode === "duos" || mode === "doubles" || mode === "2" || mode === "duo") mode = "DOUBLES";
        else if (mode === "allmode" || mode === "all" || mode === "overall" || mode === "ALL_MODES") mode = "ALL_MODES";
        else return message.channel.send(`**🛑Error:** ${mode} not recoganized!`);

        const currApi = `https://stats.pika-network.net/api/profile/${playerIGN}/leaderboard?type=skywars&interval=${interval}&mode=${mode}`;
        const profileAPI = `https://stats.pika-network.net/api/profile/${playerIGN}`;

        let isOk = true;

        fetch(profileAPI).then( dataOne => {
            return dataOne.json();
        }).then(objectData => {
            console.log("GOOD");
        }).catch(res => {
            isOk = false;
            console.log(isOk);
            message.channel.send("**🛑Error: Player not found**");
            //console.log(res.message);
        });
        
        //console.log(currApi);

        let tempInterval, tempMode;

        if (interval === "total") tempInterval = "LifeTime";
        else tempInterval = interval;

        if (mode === "ALL_MODES") tempMode = "Overall";
        else tempMode = mode;

        let playerStatsEmbed = new Discord.MessageEmbed()
            .setTitle(`**${playerIGN}'s Skywars 🎯 Stats**`)
            .setDescription(`\`Skywars | ${tempInterval} | ${tempMode}\``)
            .setFooter('#BloodLustForLife')
            .setThumbnail(`https://crafthead.net/avatar/${playerIGN}`)
            .setColor("RED");

        fetch(currApi).then((isData) => {
            return isData.json();
        }).then((objectedData) => {

            let noPlace = "unspecified";

            try {
                let isName = objectedData["Games played"];
            } catch (error) {
                return message.channel.send("Invalid Player!! type the exact IGN.");
            }

            let amountWins, rankWins, amountLosses, rankLosses;

            try {
                amountWins = objectedData["Wins"].entries[0].value;
            } catch (error) {
                amountWins = 0;
            }

            try {
                rankWins = objectedData["Wins"].entries[0].place;
            } catch (error) {
                rankWins = noPlace;
            }

            try {
                amountLosses = objectedData["Losses"].entries[0].value;
            } catch (error) {
                amountLosses = 0;
            }

            try {
                rankLosses = objectedData["Losses"].entries[0].place;
            } catch (error) {
                rankLosses = noPlace;
            }

            let isWLR, amountWinstreak, rankWinstreak, amountGamesPlayed, rankGamesPlayed;

            if (amountLosses == 0) isWLR = "infin";
            else {
                isWLR = amountWins / amountLosses;
                isWLR = isWLR.toPrecision(3);
            }

            try {
                amountWinstreak = objectedData["Highest winstreak reached"].entries[0].value;
            } catch (error) {
                amountWinstreak = 0;
            }

            try {
                rankWinstreak = objectedData["Highest winstreak reached"].entries[0].place;
            } catch (error) {
                rankWinstreak = noPlace;
            }

            try {
                amountGamesPlayed = objectedData["Games played"].entries[0].value;
            } catch (error) {
                amountGamesPlayed = 0;
            }
            try {
                rankGamesPlayed = objectedData["Games played"].entries[0].place;
            } catch (error) {
                rankGamesPlayed = noPlace;
            }

            let amountMKills, rankMKills, amountBKills, rankBKills;

            try {
                amountMKills = objectedData["Melee kills"].entries[0].value;
            } catch (error) {
                amountMKills = 0;
            }

            try {
                rankMKills = objectedData["Melee kills"].entries[0].place;
            } catch (error) {
                rankMKills = noPlace;
            }

            try {
                amountBKills = objectedData["Bow kills"].entries[0].value;
            } catch (error) {
                amountWinstreak = 0;
            }

            try {
                rankBKills = objectedData["Bow kills"].entries[0].place;
            } catch (error) {
                rankWinstreak = noPlace;
            }

            let amountVKills, rankVKills, amountKills, rankKills, amountDeaths, rankDeaths;

            try {
                amountVKills = objectedData["Void kills"].entries[0].value;
            } catch (error) {
                amountVKills = 0;
            }

            try {
                rankVKills = objectedData["Void kills"].entries[0].place;
            } catch (error) {
                rankVKills = noPlace;
            }

            try {
                amountKills = objectedData["Kills"].entries[0].value;
            } catch (error) {
                amountKills = 0;
            }

            try {
                rankKills = objectedData["Kills"].entries[0].place;
            } catch (error) {
                rankKills = noPlace;
            }

            try {
                amountDeaths = objectedData["Deaths"].entries[0].value;
            } catch (error) {
                amountDeaths = 0;
            }

            try {
                rankDeaths = objectedData["Deaths"].entries[0].place;
            } catch (error) {
                rankDeaths = noPlace;
            }

            let amountAHit, rankAHit, amountAShot, rankAShot;

            try {
                amountAHit = objectedData["Arrows hit"].entries[0].value;
            } catch (error) {
                amountAHit = 0;
            }

            try {
                rankAHit = objectedData["Arrows hit"].entries[0].place;
            } catch (error) {
                rankAHit = noPlace;
            }

            try {
                amountAShot = objectedData["Arrows shot"].entries[0].value;
            } catch (error) {
                amountAShot = 0;
            }

            try {
                rankAShot = objectedData["Arrows shot"].entries[0].place;
            } catch (error) {
                rankAShot = noPlace;
            }

            let isKDR;
            try {
                isKDR = amountKills / amountDeaths;
            } catch (error) {
                isKDR = 0;
            }

            playerStatsEmbed
                .addField(`**Wins:** ${amountWins}`, `Ranks #${rankWins} on entire server.`, true)
                .addField(`**Losses:** ${amountLosses}`, `Ranks #${rankLosses} on entire server.`, true)
                .addField(`**WLR:** ${isWLR}`, `*Warning: Hubs excluded*`, true)
                .addField(`**Highest Winstreak:** ${amountWinstreak}`, `Ranks #${rankWinstreak} on entire server.`, true)
                .addField(`**GamesPlayed:** ${amountGamesPlayed}`, `Ranks #${rankGamesPlayed} on entire server.`, true)
                .addField(`**Melee Kills:** ${amountMKills}`, `Ranks #${rankMKills} on entire server.`, true)
                .addField(`**Bow Kills:** ${amountBKills}`, `Ranks #${rankBKills} on entire server.`, true)
                .addField(`**Void Kills:** ${amountVKills}`, `Ranks #${rankVKills} on entire server.`, true)
                .addField(`**Total Kills:** ${amountKills}`, `Ranks #${rankKills} on entire server.`, true)
                .addField(`**Deaths:** ${amountDeaths}`, `Ranks #${rankDeaths} on entire server.`, true)
                .addField(`**KDR:** ${isKDR.toPrecision(3)}`, `May not be accurate.`, true)
                .addField(`**Arrows Hit:** ${amountAHit}`, `Ranks #${rankAHit} on entire server.`, true)
                .addField(`**Arrows Shot:** ${amountAShot}`, `Ranks #${rankAShot} on entire server.`, true);


                if (isOk) message.channel.send(playerStatsEmbed);
        }).catch(res => {
            message.channel.send("**🛑Error: Player not found**");
            console.log(res.message);
        });

    }
}