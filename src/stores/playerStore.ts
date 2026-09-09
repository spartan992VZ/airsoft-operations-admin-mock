import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Player } from "../types";

interface PlayerState {
  players: Player[];
  selectedPlayer: Player | null;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  updatePlayer: (id: number, player: Partial<Player>) => void;
  deletePlayer: (id: number) => void;
  setSelectedPlayer: (player: Player | null) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      players: [],
      selectedPlayer: null,
      setPlayers: (players) => set({ players }),
      addPlayer: (player) => set((state) => ({ players: [...state.players, player] })),
      updatePlayer: (id, player) =>
        set((state) => ({
          players: state.players.map((p) => (p.id === id ? { ...p, ...player } : p)),
        })),
      deletePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
          selectedPlayer: state.selectedPlayer?.id === id ? null : state.selectedPlayer,
        })),
      setSelectedPlayer: (player) => set({ selectedPlayer: player }),
    }),
    { name: "player-storage" }
  )
);
