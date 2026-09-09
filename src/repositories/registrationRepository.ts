import { BaseRepository } from "./baseRepository";
import { Registration } from "../types";

export class RegistrationRepository extends BaseRepository<Registration> {
  constructor() {
    super("registrations");
  }
}
