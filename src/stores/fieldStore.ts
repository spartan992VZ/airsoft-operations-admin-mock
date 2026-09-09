import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Field, FieldFilters } from "../types";

interface FieldState {
  fields: Field[];
  selectedField: Field | null;
  filters: FieldFilters;
  setFields: (fields: Field[]) => void;
  addField: (field: Field) => void;
  updateField: (id: number, field: Partial<Field>) => void;
  deleteField: (id: number) => void;
  setSelectedField: (field: Field | null) => void;
  setFilters: (filters: FieldFilters) => void;
  resetFilters: () => void;
}

const initialFilters: FieldFilters = {
  status: "all",
  availability: "all",
  region: "all",
  search: "",
};

export const useFieldStore = create<FieldState>()(
  persist(
    (set) => ({
      fields: [],
      selectedField: null,
      filters: initialFilters,
      setFields: (fields) => set({ fields }),
      addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
      updateField: (id, field) =>
        set((state) => ({
          fields: state.fields.map((f) => (f.id === id ? { ...f, ...field } : f)),
        })),
      deleteField: (id) =>
        set((state) => ({
          fields: state.fields.filter((f) => f.id !== id),
          selectedField: state.selectedField?.id === id ? null : state.selectedField,
        })),
      setSelectedField: (field) => set({ selectedField: field }),
      setFilters: (filters) => set({ filters }),
      resetFilters: () => set({ filters: initialFilters }),
    }),
    { name: "field-storage" }
  )
);
