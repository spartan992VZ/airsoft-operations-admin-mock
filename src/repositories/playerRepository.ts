import { BaseRepository } from "./baseRepository";
import { Player } from "../types";

export class PlayerRepository extends BaseRepository<Player> {
  constructor() {
    super("players");
  }
}
