"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnOrderState,
  GroupingState,
  ExpandedState,
  Row,
  Table as ReactTableInstance,
} from "@tanstack/react-table";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { ChevronDown, ChevronRight, ChevronsUpDown, GripVertical, ArrowDownWideNarrow, ArrowUpNarrowWide, Library } from "lucide-react";

import { Table, Thead, Tbody, Tr, Th, Td } from "./Table";
import Button from "./Button";
import Filter, { FilterOption } from "./Filter";
import clsx from "clsx";

/**
 * DATATABLE PROPS
 */
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // Features
  enableSorting?: boolean;
  enableGrouping?: boolean;
  enableColumnReorder?: boolean;
  enableGlobalFilter?: boolean;
  globalFilterPlaceholder?: string;
  enablePagination?: boolean;
  pageSize?: number;
  filterOptions?: FilterOption[];
  onFilterChange?: (val: string | null) => void;
  // Visual
  className?: string;
}

export function DataTable<TData, TValue>({
  columns: initialColumns,
  data,
  enableSorting = true,
  enableGrouping = true,
  enableColumnReorder = true,
  enableGlobalFilter = true,
  globalFilterPlaceholder = "Search all columns...",
  enablePagination = true,
  pageSize = 10,
  filterOptions,
  onFilterChange,
  className,
}: DataTableProps<TData, TValue>) {
  
  // -- Table States --
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(() =>
    initialColumns.map((c) => c.id as string)
  );
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | null>(null);

  const handleFilterSelection = (val: string | null) => {
    setSelectedFilterValue(val);
    if (onFilterChange) onFilterChange(val);
  };

  // If columns change externally, update order
  useEffect(() => {
    setColumnOrder(initialColumns.map((c) => c.id as string));
  }, [initialColumns]);

  // -- Initialize Table --
  const table = useReactTable({
    data,
    columns: initialColumns,
    state: {
      sorting,
      globalFilter,
      columnOrder,
      grouping,
      expanded,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnOrderChange: setColumnOrder,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    // Options
    enableSorting,
    enableGrouping,
  });

  // Default page size
  useEffect(() => {
    if (enablePagination && pageSize) {
      table.setPageSize(pageSize);
    }
  }, [enablePagination, pageSize, table]);

  // -- Drag & Drop Handlers --
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    if (startIndex === endIndex) return;

    const newColumnOrder = Array.from(columnOrder);
    const [reorderedItem] = newColumnOrder.splice(startIndex, 1);
    newColumnOrder.splice(endIndex, 0, reorderedItem);
    setColumnOrder(newColumnOrder);
  };

  return (
    <div className={clsx("flex flex-col gap-4 w-full", className)}>
      
      {/* Top Toolbar: Search, Filters, Grouping Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {enableGlobalFilter && (
          <div className="w-full sm:w-auto">
            <Filter
              placeholder={globalFilterPlaceholder}
              searchValue={globalFilter}
              onSearchChange={(val) => setGlobalFilter(val)}
              filterOptions={filterOptions}
              onFilterChange={handleFilterSelection}
              selectedFilter={selectedFilterValue}
            />
          </div>
        )}
      </div>

      {/* Main Table Wrapper */}
      <Table hoverable striped className="relative z-0">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Thead>
            <Droppable droppableId="columns" direction="horizontal">
              {(provided) => (
                <tr
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[var(--color-surface)]"
                >
                  {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header, index) => {
                      const colSpan = header.colSpan;
                      const column = header.column;
                      // Don't drag if grouped column Header
                      const isDraggable = enableColumnReorder && !header.isPlaceholder && column.id;

                      return (
                        <Draggable
                          key={header.id}
                          draggableId={header.id}
                          index={index}
                          isDragDisabled={!isDraggable}
                        >
                          {(draggableProvided, snapshot) => (
                            <Th
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              colSpan={colSpan}
                              className={clsx(
                                "relative select-none group",
                                snapshot.isDragging && "bg-[var(--color-surface-hover)] shadow-xl z-50 rounded-md"
                              )}
                              style={{ ...draggableProvided.draggableProps.style }}
                            >
                              <div className="flex items-center gap-2 w-full">
                                {/* Drag Handle */}
                                {isDraggable && (
                                  <div
                                    {...draggableProvided.dragHandleProps}
                                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <GripVertical size={14} />
                                  </div>
                                )}

                                {/* Content */}
                                <div
                                  className={clsx(
                                    "flex items-center gap-1 flex-1",
                                    column.getCanSort() && "cursor-pointer hover:text-[var(--color-text)] transition-colors"
                                  )}
                                  onClick={column.getToggleSortingHandler()}
                                >
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                  
                                  {/* Sort Icon */}
                                  {column.getIsSorted() && (
                                    <span className="text-[var(--color-primary)]">
                                      {column.getIsSorted() === "asc" ? <ArrowDownWideNarrow size={14}/> : <ArrowUpNarrowWide size={14}/>}
                                    </span>
                                  )}
                                  {/* Sort Placeholder on hover */}
                                  {column.getCanSort() && !column.getIsSorted() && (
                                    <span className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100">
                                      <ChevronsUpDown size={14} />
                                    </span>
                                  )}
                                </div>
                                
                                {/* Grouping Toggle */}
                                {enableGrouping && column.getCanGroup() && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); column.toggleGrouping(); }}
                                    className={clsx(
                                      "p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",
                                      column.getIsGrouped() ? "text-[var(--color-primary)] opacity-100" : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                                    )}
                                    title={column.getIsGrouped() ? "Ungroup" : "Group by column"}
                                  >
                                    <Library size={12} />
                                  </button>
                                )}
                              </div>
                            </Th>
                          )}
                        </Draggable>
                      );
                    })
                  )}
                  {provided.placeholder}
                </tr>
              )}
            </Droppable>
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        className={clsx(
                          cell.column.getIsGrouped() && "bg-[var(--color-surface-hover)]/30 font-medium"
                        )}
                      >
                         {/* Grouping UI logic */}
                         {cell.getIsGrouped() ? (
                          // If it's a grouped cell, add an expander and row count
                          <div className="flex items-center gap-2">
                            <button
                              onClick={row.getToggleExpandedHandler()}
                              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors p-1"
                            >
                              {row.getIsExpanded() ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                            <span className="font-semibold text-[var(--color-text)] cursor-pointer" onClick={row.getToggleExpandedHandler()}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
                            </span>
                          </div>
                        ) : cell.getIsAggregated() ? (
                          // If the cell is aggregated, use the Aggregated render
                          flexRender(
                            cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </DragDropContext>
      </Table>
      
      {/* Empty State */}
      {data.length === 0 && (
         <div className="text-center py-10 text-[var(--color-muted)] border rounded-[var(--radius-lg)] border-[var(--color-border)] mt-2">
           No results found.
         </div>
      )}

      {/* Pagination Footer */}
      {enablePagination && table.getPageCount() > 1 && (
        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 px-2">
          <div className="text-sm text-[var(--color-muted)]">
            Showing <span className="font-medium text-[var(--color-text)]">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to <span className="font-medium text-[var(--color-text)]">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</span> of <span className="font-medium text-[var(--color-text)]">{table.getFilteredRowModel().rows.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <div className="text-sm text-[var(--color-text-secondary)] font-medium px-2">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
