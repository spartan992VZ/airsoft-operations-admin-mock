import { BaseRepository } from "./baseRepository";
import { Match } from "../types/championship";

export class MatchRepository extends BaseRepository<Match> {
  constructor() {
    super("matches");
  }

  getByChampionshipId(championshipId: number): Match[] {
    return this.query((m) => m.championshipId === championshipId);
  }

  getByRound(championshipId: number, round: number): Match[] {
    return this.query((m) => m.championshipId === championshipId && m.round === round);
  }

  getByGroup(championshipId: number, groupName: string): Match[] {
    return this.query((m) => m.championshipId === championshipId && m.groupName === groupName);
  }

  getByStatus(championshipId: number, status: string): Match[] {
    return this.query((m) => m.championshipId === championshipId && m.status === status);
  }

  updateMatchScore(matchId: number, team1Score: number, team2Score: number, winnerId: number | null): Match | null {
    return this.update(matchId, { team1Score, team2Score, winnerId, status: "completed" as const });
  }

  updateMatchStatus(matchId: number, status: "scheduled" | "in_progress" | "completed" | "cancelled"): Match | null {
    return this.update(matchId, { status });
  }
}
