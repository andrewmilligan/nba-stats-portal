const nba = new Map([
  // Atlanta Hawks (teamId: 1610612737)
  [1610612737, ["#e13a3e", "#dadada", "#e03a3e"]],
  // Brooklyn Nets (teamId: 1610612751)
  [1610612751, ["#385d6e", "#dfdfdf", "#000000"]],
  // Boston Celtics (teamId: 1610612738)
  [1610612738, ["#008348", "#ffffff", "#008348"]],
  // Charlotte Hornets (teamId: 1610612766)
  [1610612766, ["#1d8cab", "#5d468a", "#00788c"]],
  // Chicago Bulls (teamId: 1610612741)
  [1610612741, ["#ce1141", "#c1c1c1", "#ce1141"]],
  // Cleveland Cavaliers (teamId: 1610612739)
  [1610612739, ["#860038", "#bc945c", "#6f263d"]],
  // Dallas Mavericks (teamId: 1610612742)
  [1610612742, ["#0064b1", "#bbc4ca", "#0053BC"]],
  // Denver Nuggets (teamId: 1610612743)
  [1610612743, ["#4d90cd", "#fec524", "#0e2240"]],
  // Detroit Pistons (teamId: 1610612765)
  [1610612765, ["#006bb6", "#C80F2D", "#1d428a"]],
  // Golden State Warriors (teamId: 1610612744)
  [1610612744, ["#006bb6", "#fdb927", "#FDB927"]],
  // Houston Rockets (teamId: 1610612745)
  [1610612745, ["#ce1141", "#d7d7d7", "#ce1141"]],
  // Indiana Pacers (teamId: 1610612754)
  [1610612754, ["#2d5e98", "#ffc633", "#fdbb30"]],
  // LA Clippers (teamId: 1610612746)
  [1610612746, ["#ed174c", "#ececec", "#c8102e"]],
  // Los Angeles Lakers (teamId: 1610612747)
  [1610612747, ["#74479f", "#fdb927", "#552583"]],
  // Memphis Grizzlies (teamId: 1610612763)
  [1610612763, ["#7399c6", "#ffbb25", "#5d76a9"]],
  // Miami Heat (teamId: 1610612748)
  [1610612748, ["#98002e", "#f7a11d", "#98002e"]],
  // Milwaukee Bucks (teamId: 1610612749)
  [1610612749, ["#466e46", "#ede0c5", "#00471b"]],
  // Minnesota Timberwolves (teamId: 1610612750)
  [1610612750, ["#005083", "#78bc1e", "#0c2340"]],
  // New Orleans Pelicans (teamId: 1610612740)
  [1610612740, ["#355988", "#b4975a", "#002b5c"]],
  // New York Knicks (teamId: 1610612752)
  [1610612752, ["#006bb6", "#FA672B", "#006bb6"]],
  // Oklahoma City Thunder (teamId: 1610612760)
  [1610612760, ["#007dc3", "#ee3c33", "#007ac1"]],
  // Orlando Magic (teamId: 1610612753)
  [1610612753, ["#007dc5", "#c2ccd2", "#0077c0"]],
  // Philadelphia 76ers (teamId: 1610612755)
  [1610612755, ["#ed174c", "#ffffff", "#006bb6"]],
  // Phoenix Suns (teamId: 1610612756)
  [1610612756, ["#5444a9", "#e56020", "#1d1160"]],
  // Portland Trail Blazers (teamId: 1610612757)
  [1610612757, ["#e03a3e", "#ffffff", "#061922"]],
  // Sacramento Kings (teamId: 1610612758)
  [1610612758, ["#724c9f", "#ffffff", "#5a2d81"]],
  // San Antonio Spurs (teamId: 1610612759)
  [1610612759, ["#05a39d", "#c4ced4", "#000000"]],
  // Toronto Raptors (teamId: 1610612761)
  [1610612761, ["#ce1141", "#ffffff", "#000000"]],
  // Utah Jazz (teamId: 1610612762)
  [1610612762, ["#256cbd", "#f9a01b", "#ffffff"]],
  // Washington Wizards (teamId: 1610612764)
  [1610612764, ["#0060cf", "#c2c2c3", "#e31837"]],
]);

const wnba = new Map([
  [1611661319, ['#ce1141', '#061922']],
  [1611661330, ['#e31837', '#373a36']],
  [1611661325, ['#e03a3e', '#002d62']],
  [1611661313, ['#86cebc', '#000000']],
  [1611661324, ['#266092', '#0c233f']],
  [1611661317, ['#e56020', '#1d1160']],
  [1611661322, ['#e03a3e', '#002b5c']],
  [1611661329, ['#ffd520', '#5091cd']],
  [1611661320, ['#552583', '#fdb927']],
  [1611661328, ['#2c5235', '#fee11a']],
  [1611661323, ['#f05023', '#0a2240']],
  [1611661321, ['#002b5c', '#c4d600']]
]);

const teamColors = {
  nba,
  wnba,
};

export default teamColors;
