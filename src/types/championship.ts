export type ChampionshipFormat = "elimination" | "groups" | "mixed";
export type MatchStatus = "scheduled" | "in_progress" | "completed" | "cancelled";
export type ChampionshipStatus = "draft" | "registration_open" | "in_progress" | "completed" | "cancelled";

export interface Match {
  id: number;
  championshipId: number;
  round: number;
  matchNumber: number;
  team1Id: number | null;
  team1Name: string | null;
  team1Score: number | null;
  team2Id: number | null;
  team2Name: string | null;
  team2Score: number | null;
  winnerId: number | null;
  status: MatchStatus;
  scheduledTime: string;
  fieldId: number | null;
  groupName?: string;
  bracketPosition?: string;
}

export interface Group {
  id: number;
  championshipId: number;
  name: string;
  teams: number[];
}

export interface Standing {
  id: number;
  championshipId: number;
  groupId: number | null;
  teamId: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  points: number;
}

export interface Championship {
  id: number;
  eventId: number;
  eventName: string;
  name: string;
  description: string;
  format: ChampionshipFormat;
  status: ChampionshipStatus;
  maxTeams: number;
  registeredTeams: number;
  groupsPerTeam?: number;
  teamsAdvancing?: number;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
}

export interface ChampionshipFilters {
  eventId: string;
  status: ChampionshipStatus | string;
  format: ChampionshipFormat | string;
  search: string;
}
