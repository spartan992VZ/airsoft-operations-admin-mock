import { BaseRepository } from "./baseRepository";
import { Championship } from "../types/championship";

export class ChampionshipRepository extends BaseRepository<Championship> {
  constructor() {
    super("championships");
  }

  getByEventId(eventId: number): Championship[] {
    return this.query((c) => c.eventId === eventId);
  }

  getByStatus(status: string): Championship[] {
    return this.query((c) => c.status === status);
  }
}
