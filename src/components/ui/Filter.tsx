import React, { useState } from "react";
import { Search, Filter as FilterIcon, X } from "lucide-react";
import { Input, Button } from "@/components/ui";

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterProps = {
  placeholder?: string;
  onSearchChange?: (val: string) => void;
  searchValue?: string;
  /* Optional advanced filters (e.g. status) */
  filterOptions?: FilterOption[];
  onFilterChange?: (val: string | null) => void;
  selectedFilter?: string | null;
  className?: string;
};

export default function Filter({
  placeholder = "Search...",
  onSearchChange,
  searchValue = "",
  filterOptions,
  onFilterChange,
  selectedFilter,
  className = "",
}: FilterProps) {
  const [internalSearch, setInternalSearch] = useState(searchValue);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync internal search with external if provided, else manage internally
  React.useEffect(() => {
    if (searchValue !== undefined) setInternalSearch(searchValue);
  }, [searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalSearch(val);
    onSearchChange?.(val);
  };

  const handleClear = () => {
    setInternalSearch("");
    onSearchChange?.("");
    if (onFilterChange) onFilterChange(null);
  };

  return (
    <div className={`flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:justify-between ${className}`}>
      {/* Search Input */}
      <div className="relative flex-1 max-w-md group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-muted)] group-focus-within:text-[var(--color-primary)] transition-colors">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={internalSearch}
          onChange={handleSearch}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-10 py-2 text-sm
            bg-[var(--color-surface)] text-[var(--color-text)]
            border border-[var(--color-border)] rounded-[var(--radius-lg)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-subtle)] focus:border-[var(--color-primary)]
            transition-all shadow-sm
          `}
        />
        {internalSearch && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Advanced Filters Toggle */}
      {filterOptions && filterOptions.length > 0 && (
        <div className="relative">
          <Button
            variant={selectedFilter ? "primary" : "outline"}
            size="sm"
            onClick={() => setFiltersOpen(!filtersOpen)}
            leftIcon={<FilterIcon size={14} />}
            className="w-full sm:w-auto shadow-sm"
          >
            {selectedFilter
              ? filterOptions.find((o) => o.value === selectedFilter)?.label || "Filtered"
              : "Filters"}
          </Button>

          {/* Simple Dropdown for Filters */}
          {filtersOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-lg overflow-hidden z-20 animate-in fade-in slide-in-from-top-2">
              <div className="p-1">
                <button
                  onClick={() => {
                    onFilterChange?.(null);
                    setFiltersOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-[var(--radius-sm)] transition-colors ${
                    !selectedFilter ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)] font-medium" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                  }`}
                >
                  All
                </button>
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onFilterChange?.(opt.value);
                      setFiltersOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-[var(--radius-sm)] transition-colors ${
                      selectedFilter === opt.value
                        ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)] font-medium"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
