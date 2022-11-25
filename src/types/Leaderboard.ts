interface RankedTeam {
  rank: number;
  username: string;
  pointsEarned: number;
  points: number;
  bonus: number;
  lastEarned: string;
}

export default interface LeaderboardType {
  self: RankedTeam;
  leaderboard: RankedTeam[];
}
