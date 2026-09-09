import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Team, TeamFilters } from "../types";

interface TeamState {
  teams: Team[];
  selectedTeam: Team | null;
  filters: TeamFilters;
  setTeams: (teams: Team[]) => void;
  addTeam: (team: Team) => void;
  updateTeam: (id: number, team: Partial<Team>) => void;
  deleteTeam: (id: number) => void;
  setSelectedTeam: (team: Team | null) => void;
  setFilters: (filters: TeamFilters) => void;
  resetFilters: () => void;
}

const initialFilters: TeamFilters = {
  status: "all",
  modality: "all",
  region: "all",
  search: "",
};

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teams: [],
      selectedTeam: null,
      filters: initialFilters,
      setTeams: (teams) => set({ teams }),
      addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
      updateTeam: (id, team) =>
        set((state) => ({
          teams: state.teams.map((t) => (t.id === id ? { ...t, ...team } : t)),
        })),
      deleteTeam: (id) =>
        set((state) => ({
          teams: state.teams.filter((t) => t.id !== id),
          selectedTeam: state.selectedTeam?.id === id ? null : state.selectedTeam,
        })),
      setSelectedTeam: (team) => set({ selectedTeam: team }),
      setFilters: (filters) => set({ filters }),
      resetFilters: () => set({ filters: initialFilters }),
    }),
    { name: "team-storage" }
  )
);
