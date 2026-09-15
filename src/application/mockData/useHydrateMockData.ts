import { useEffect } from "react";
import { browserStorage } from "../../infrastructure/storage/browserStorage";
import { useEventStore } from "../../stores/eventStore";
import { useFieldStore } from "../../stores/fieldStore";
import { useRegistrationStore } from "../../stores/registrationStore";
import { useTeamStore } from "../../stores/teamStore";

function hydrateCollection<T>(key: string, items: T[], setItems: (value: T[]) => void): void {
  if (items.length > 0) return;

  const storedItems = browserStorage.get<T[]>(key);
  if (storedItems) setItems(storedItems);
}

export function useHydrateMockData(): void {
  const events = useEventStore((state) => state.events);
  const setEvents = useEventStore((state) => state.setEvents);
  const fields = useFieldStore((state) => state.fields);
  const setFields = useFieldStore((state) => state.setFields);
  const registrations = useRegistrationStore((state) => state.registrations);
  const setRegistrations = useRegistrationStore((state) => state.setRegistrations);
  const teams = useTeamStore((state) => state.teams);
  const setTeams = useTeamStore((state) => state.setTeams);

  useEffect(() => {
    hydrateCollection("events", events, setEvents);
    hydrateCollection("fields", fields, setFields);
    hydrateCollection("registrations", registrations, setRegistrations);
    hydrateCollection("teams", teams, setTeams);
  }, [events, fields, registrations, teams, setEvents, setFields, setRegistrations, setTeams]);
}
