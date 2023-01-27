module.exports = {
    name: 'leaderboard',
    aliases: ['lb', 'leaderb'],
    cooldown: 5,
    permissions: [],
    description: 'shows leaderboard',
    execute(message, args, cmd, client, Discord) {

        let gamemodeLeaderboard = args[0];
        let typeLeaderboard = args[1];
        let intervalLeaderboard = args[2];
        let modeLeaderboard = args[3];

        let gameMode = "nan";
        let stat;
        let interval = "total";
        let mode = "ALL_MODES";
        
        
        if (gamemodeLeaderboard) gameMode = gamemodeLeaderboard.toLowerCase();
        else return message.channel.send("Command: !leaderboard \`gamemode\` \`stat\` \`interval(optional)\` \`mode(optional)\`");

        //if (gameMode == "nan") return message.channel.send("!leaderboard \`gamemode\` \`stat\` \`interval(optional)\` \`mode(optional)\`");
        if (gameMode !== "bedwars" && gameMode !== "bw" && gameMode !== "skywars" && gameMode !== "sw" && gameMode !== "nan") return message.channel.send(`**🛑Error:** ${gamemodeLeaderboard} not recognized! try \`bw\` or \`sw\``);

        if (typeLeaderboard) stat = typeLeaderboard.toLowerCase();
        else return message.channel.send("Command: !leaderboard \`gamemode\` \`stat\` \`interval(optional)\` \`mode(optional)\`");;

        if (intervalLeaderboard) interval = intervalLeaderboard.toLowerCase();
      
        if (modeLeaderboard) mode = modeLeaderboard.toLowerCase();


        if (stat === "gamesplayed" || stat === "played") stat = "played";
        else if (stat === "beds" || stat === "bed" || stat == "beddestroyed") stat = "BED_DESTROYED";
        else if (stat === "final" || stat === "finals" || stat === "finalkills" || stat === "finalkill") stat = "FINAL_KILLS";
        else if (stat === "winstreak" || stat === "ws") stat = "HIGHEST_WIN_STREAK";
        else if (stat === "win" || stat === "wins") stat = "wins";
        else if (stat === "kills" || stat == "kill") stat = "kills";
        else return message.channel.send(`**🛑Error:** ${typeLeaderboard} not recoganized!`);

        if (interval === "weekly" || interval === "week") interval = "weekly";
        else if (interval === "monthly" || interval === "month") interval = "monthly";
        else if (interval === "yearly" || interval === "year") interval = "yearly";
        else if (interval === "alltime" || interval === "lifetime" || interval === "total") interval = "total";
        else return message.channel.send(`**🛑Error:** ${intervalLeaderboard} not recoganized!`);


        if (mode === "solo" || mode === "1") mode = "SOLO";
        else if (mode === "duos" || mode === "doubles" || mode === "2" || mode === "duo") mode = "DOUBLES";
        else if (mode === "trio" || mode === "trios" || mode === "triples" || mode === "3") mode = "TRIPLES";
        else if (mode === "quads" || mode === "quad" || mode === "4" || mode === "quadriple") mode = "QUAD";
        else if (mode === "allmode" || mode === "all" || mode === "overall" || mode === "ALL_MODES") mode = "ALL_MODES";
        else return message.channel.send(`**🛑Error:** ${modeLeaderboard} not recoganized!`);


        if (gameMode === "bedwars" || gameMode === "bw") gameMode = "bedwars";
        if (gameMode == "skywars" || gameMode == "sw") {
            gameMode = "skywars";

            if (stat != "kills" && stat != "wins" && stat != "HIGHEST_WIN_STREAK" && stat != "played") return message.channel.send(`**🛑Error:** There is no ${typeLeaderboard} in ${gamemodeLeaderboard}!`)

        }

        const currLbApi = `https://stats.pika-network.net/api/leaderboards?type=${gameMode}&stat=${stat}&interval=${interval}&mode=${mode}&offset=0&limit=15`;

        //console.log(currLbApi);

        fetch(currLbApi).then((isData) => {
            return isData.json();
        }).then((objectedData) => {

            let leaderBoardEmbed = new Discord.MessageEmbed();

            let tempInterval, tempMode;

            if (interval === "total") tempInterval = "LifeTime";
            else tempInterval = interval;

            if (mode === "ALL_MODES") tempMode = "Overall";
            else tempMode = mode;

            leaderBoardEmbed
                .setTitle(`**${typeLeaderboard.toUpperCase()} Leaderboard \`(${tempInterval})|(${tempMode})\`**`)
                .setDescription(`${gameMode} | ${tempInterval} | ${tempMode}`)
                .setFooter('#BloodLustForLife');

            for (let i = 0; i < 15; i++) {

                let name = objectedData.entries[i].id;
                let place = objectedData.entries[i].place;
                let rank = objectedData.entries[i].rank;
                let guild = objectedData.entries[i].clan;
                let amount = objectedData.entries[i].value;

                if (!guild) guild = "No Guild";
                if (!rank) rank = "NON";

                leaderBoardEmbed
                    .addField(`**#${place}**  \`${rank}\` ${name}  |  ${amount}`, `Guild: ${guild}`);

            }

            message.channel.send(leaderBoardEmbed);

        });


    }
}