import { BaseRepository } from "./baseRepository";
import { Field } from "../types";

export class FieldRepository extends BaseRepository<Field> {
  constructor() {
    super("fields");
  }
}
