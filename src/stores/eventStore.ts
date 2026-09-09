import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event, EventFilters } from "../types";

interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  filters: EventFilters;
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: number, event: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
  setSelectedEvent: (event: Event | null) => void;
  setFilters: (filters: EventFilters) => void;
  resetFilters: () => void;
}

const initialFilters: EventFilters = {
  status: "all",
  field: "all",
  modality: "all",
  search: "",
};

export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      events: [],
      selectedEvent: null,
      filters: initialFilters,
      setEvents: (events: Event[]) => set({ events }),
      addEvent: (event: Event) => set((state) => ({ events: [...state.events, event] })),
      updateEvent: (id: number, event: Partial<Event>) =>
        set((state) => ({
          events: state.events.map((e: Event) => (e.id === id ? { ...e, ...event } : e)),
        })),
      deleteEvent: (id: number) =>
        set((state) => ({
          events: state.events.filter((e: Event) => e.id !== id),
          selectedEvent: state.selectedEvent?.id === id ? null : state.selectedEvent,
        })),
      setSelectedEvent: (event: Event | null) => set({ selectedEvent: event }),
      setFilters: (filters: EventFilters) => set({ filters }),
      resetFilters: () => set({ filters: initialFilters }),
    }),
    { name: "event-storage" }
  )
);
