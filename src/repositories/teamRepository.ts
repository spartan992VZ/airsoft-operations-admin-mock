import { BaseRepository } from "./baseRepository";
import { Team } from "../types";

export class TeamRepository extends BaseRepository<Team> {
  constructor() {
    super("teams");
  }
}
