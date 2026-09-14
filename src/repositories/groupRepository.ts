import { BaseRepository } from "./baseRepository";
import { Group } from "../types/championship";

export class GroupRepository extends BaseRepository<Group> {
  constructor() {
    super("groups");
  }

  getByChampionshipId(championshipId: number): Group[] {
    return this.query((g) => g.championshipId === championshipId);
  }

  addTeamToGroup(groupId: number, teamId: number): Group | null {
    const group = this.getById(groupId);
    if (!group) return null;

    if (!group.teams.includes(teamId)) {
      group.teams.push(teamId);
      return this.update(groupId, { teams: group.teams });
    }
    return group;
  }

  removeTeamFromGroup(groupId: number, teamId: number): Group | null {
    const group = this.getById(groupId);
    if (!group) return null;

    const updatedTeams = group.teams.filter((t) => t !== teamId);
    return this.update(groupId, { teams: updatedTeams });
  }
}
