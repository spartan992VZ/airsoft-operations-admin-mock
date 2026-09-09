import { BaseRepository } from "./baseRepository";
import { Event } from "../types";

export class EventRepository extends BaseRepository<Event> {
  constructor() {
    super("events");
  }
}
