import { BaseRepository } from "./baseRepository";
import { Standing } from "../types/championship";

export class StandingRepository extends BaseRepository<Standing> {
  constructor() {
    super("standings");
  }

  getByChampionshipId(championshipId: number): Standing[] {
    return this.query((s) => s.championshipId === championshipId);
  }

  getByGroupId(championshipId: number, groupId: number): Standing[] {
    return this.query((s) => s.championshipId === championshipId && s.groupId === groupId);
  }

  getByTeam(championshipId: number, teamId: number): Standing | null {
    const standings = this.query((s) => s.championshipId === championshipId && s.teamId === teamId);
    return standings.length > 0 ? standings[0] : null;
  }

  updateStanding(standingId: number, updates: Partial<Standing>): Standing | null {
    return this.update(standingId, updates);
  }

  updateTeamStats(
    championshipId: number,
    teamId: number,
    won: number,
    drawn: number,
    lost: number,
    pointsFor: number,
    pointsAgainst: number
  ): Standing | null {
    const standing = this.getByTeam(championshipId, teamId);
    if (!standing) return null;

    const newPlayed = standing.played + won + drawn + lost;
    const newWon = standing.won + won;
    const newDrawn = standing.drawn + drawn;
    const newLost = standing.lost + lost;
    const newPointsFor = standing.pointsFor + pointsFor;
    const newPointsAgainst = standing.pointsAgainst + pointsAgainst;
    const newPoints = newWon * 3 + newDrawn;

    return this.update(standing.id, {
      played: newPlayed,
      won: newWon,
      drawn: newDrawn,
      lost: newLost,
      pointsFor: newPointsFor,
      pointsAgainst: newPointsAgainst,
      points: newPoints,
    });
  }

  getSortedStandings(championshipId: number, groupId: number | null = null): Standing[] {
    const standings = groupId
      ? this.getByGroupId(championshipId, groupId)
      : this.getByChampionshipId(championshipId);

    return standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const aDiff = a.pointsFor - a.pointsAgainst;
      const bDiff = b.pointsFor - b.pointsAgainst;
      if (bDiff !== aDiff) return bDiff - aDiff;
      return b.pointsFor - a.pointsFor;
    });
  }
}
