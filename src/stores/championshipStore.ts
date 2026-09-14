import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Championship, Match, Group, Standing, ChampionshipFilters } from "../types";

interface ChampionshipState {
  championships: Championship[];
  matches: Match[];
  groups: Group[];
  standings: Standing[];
  selectedChampionship: Championship | null;
  filters: ChampionshipFilters;
  setChampionships: (championships: Championship[]) => void;
  addChampionship: (championship: Championship) => void;
  updateChampionship: (id: number, championship: Partial<Championship>) => void;
  deleteChampionship: (id: number) => void;
  setSelectedChampionship: (championship: Championship | null) => void;
  setFilters: (filters: ChampionshipFilters) => void;
  resetFilters: () => void;
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  updateMatch: (id: number, match: Partial<Match>) => void;
  deleteMatch: (id: number) => void;
  setGroups: (groups: Group[]) => void;
  addGroup: (group: Group) => void;
  updateGroup: (id: number, group: Partial<Group>) => void;
  deleteGroup: (id: number) => void;
  setStandings: (standings: Standing[]) => void;
  addStanding: (standing: Standing) => void;
  updateStanding: (id: number, standing: Partial<Standing>) => void;
  deleteStanding: (id: number) => void;
}

const initialFilters: ChampionshipFilters = {
  eventId: "all",
  status: "all",
  format: "all",
  search: "",
};

export const useChampionshipStore = create<ChampionshipState>()(
  persist(
    (set) => ({
      championships: [],
      matches: [],
      groups: [],
      standings: [],
      selectedChampionship: null,
      filters: initialFilters,
      setChampionships: (championships: Championship[]) => set({ championships }),
      addChampionship: (championship: Championship) =>
        set((state) => ({ championships: [...state.championships, championship] })),
      updateChampionship: (id: number, championship: Partial<Championship>) =>
        set((state) => ({
          championships: state.championships.map((c: Championship) =>
            c.id === id ? { ...c, ...championship } : c
          ),
          selectedChampionship:
            state.selectedChampionship?.id === id
              ? { ...state.selectedChampionship, ...championship }
              : state.selectedChampionship,
        })),
      deleteChampionship: (id: number) =>
        set((state) => ({
          championships: state.championships.filter((c: Championship) => c.id !== id),
          selectedChampionship: state.selectedChampionship?.id === id ? null : state.selectedChampionship,
        })),
      setSelectedChampionship: (championship: Championship | null) => set({ selectedChampionship: championship }),
      setFilters: (filters: ChampionshipFilters) => set({ filters }),
      resetFilters: () => set({ filters: initialFilters }),
      setMatches: (matches: Match[]) => set({ matches }),
      addMatch: (match: Match) => set((state) => ({ matches: [...state.matches, match] })),
      updateMatch: (id: number, match: Partial<Match>) =>
        set((state) => ({
          matches: state.matches.map((m: Match) => (m.id === id ? { ...m, ...match } : m)),
        })),
      deleteMatch: (id: number) =>
        set((state) => ({
          matches: state.matches.filter((m: Match) => m.id !== id),
        })),
      setGroups: (groups: Group[]) => set({ groups }),
      addGroup: (group: Group) => set((state) => ({ groups: [...state.groups, group] })),
      updateGroup: (id: number, group: Partial<Group>) =>
        set((state) => ({
          groups: state.groups.map((g: Group) => (g.id === id ? { ...g, ...group } : g)),
        })),
      deleteGroup: (id: number) =>
        set((state) => ({
          groups: state.groups.filter((g: Group) => g.id !== id),
        })),
      setStandings: (standings: Standing[]) => set({ standings }),
      addStanding: (standing: Standing) => set((state) => ({ standings: [...state.standings, standing] })),
      updateStanding: (id: number, standing: Partial<Standing>) =>
        set((state) => ({
          standings: state.standings.map((s: Standing) => (s.id === id ? { ...s, ...standing } : s)),
        })),
      deleteStanding: (id: number) =>
        set((state) => ({
          standings: state.standings.filter((s: Standing) => s.id !== id),
        })),
    }),
    { name: "championship-storage" }
  )
);
