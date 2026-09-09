import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Registration, RegistrationFilters } from "../types";

interface RegistrationState {
  registrations: Registration[];
  selectedRegistration: Registration | null;
  filters: RegistrationFilters;
  setRegistrations: (registrations: Registration[]) => void;
  addRegistration: (registration: Registration) => void;
  updateRegistration: (id: number, registration: Partial<Registration>) => void;
  deleteRegistration: (id: number) => void;
  setSelectedRegistration: (registration: Registration | null) => void;
  setFilters: (filters: RegistrationFilters) => void;
  resetFilters: () => void;
}

const initialFilters: RegistrationFilters = {
  event: "all",
  team: "all",
  status: "all",
  paymentStatus: "all",
  search: "",
};

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      registrations: [],
      selectedRegistration: null,
      filters: initialFilters,
      setRegistrations: (registrations) => set({ registrations }),
      addRegistration: (registration) =>
        set((state) => ({ registrations: [...state.registrations, registration] })),
      updateRegistration: (id, registration) =>
        set((state) => ({
          registrations: state.registrations.map((r) =>
            r.id === id ? { ...r, ...registration } : r
          ),
        })),
      deleteRegistration: (id) =>
        set((state) => ({
          registrations: state.registrations.filter((r) => r.id !== id),
          selectedRegistration: state.selectedRegistration?.id === id ? null : state.selectedRegistration,
        })),
      setSelectedRegistration: (registration) => set({ selectedRegistration: registration }),
      setFilters: (filters) => set({ filters }),
      resetFilters: () => set({ filters: initialFilters }),
    }),
    { name: "registration-storage" }
  )
);
