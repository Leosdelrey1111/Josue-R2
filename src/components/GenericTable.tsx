import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
} from "@heroui/react";
import { ChevronDownIcon, SearchIcon } from "@styles/Icons";
import { useTranslation } from "react-i18next";
import { capitalize, ColumnDefinition, DefaultTableConfig, FilterOption, getObjectValue, ItemData, searchInObjectValues } from "./configs/GenericTableConfigs";

export interface GenericTableProps<T extends ItemData> {
  /** Datos a mostrar en la tabla */
  data: T[];
  /** Definición de columnas para la tabla */
  columns: ColumnDefinition[];
  /** Opciones para el filtro de estado  */
  filterOptions?: FilterOption[];
  /** Columnas visibles inicialmente */
  initialVisibleColumns?: string[];
  /** Función para renderizar celdas personalizadas */
  renderCell?: (item: T, columnKey: string) => ReactNode;
  /** Contenido adicional para la barra superior */
  topContentExtras?: ReactNode;
  /** Campo por el cual realizar la búsqueda */
  searchField?: string;
  /** Número inicial de filas por página */
  defaultRowsPerPage?: number;
  /** Columna para ordenamiento inicial */
  defaultSortColumn?: string;
  /** Dirección de ordenamiento inicial */
  defaultSortDirection?: "ascending" | "descending";
  /** Ocultar la funcionalidad de selección múltiple */
  hideSelection?: boolean;
  /** Clase CSS adicional para el contenedor */
  className?: string;
  // Datos default de búsqueda
  defaultFilter?: string;
  /** Desactivar completamente el ordenamiento (mantener orden del backend) */
  disableSorting?: boolean;
}

export const GenericTable = <T extends ItemData>({
  data,
  columns,
  filterOptions,
  initialVisibleColumns,
  renderCell,
  topContentExtras,
  defaultRowsPerPage = DefaultTableConfig.rowsPerPage,
  defaultSortColumn,
  defaultSortDirection = DefaultTableConfig.sortDirection,
  hideSelection = DefaultTableConfig.hideSelection,
  className,
  defaultFilter = "",
  disableSorting = false,
}: GenericTableProps<T>): JSX.Element => {
  const { t } = useTranslation(["common"]);
  const [filterValue, setFilterValue] = useState<string>(defaultFilter);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(initialVisibleColumns || columns.map((col) => col.uid)));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: defaultSortColumn || columns[0]?.uid || "",
    direction: defaultSortDirection,
  });
  const [page, setPage] = useState<number>(1);

  const hasSearchFilter = Boolean(filterValue);

  // Columnas de encabezado según las visibles
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns as Set<string>).includes(column.uid));
  }, [visibleColumns, columns]);

  // Filtrado de elementos
  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) => searchInObjectValues(item, filterValue, columns, renderCell));
    }

    // Filtro por status
    if (statusFilter !== "all" && filterOptions && Array.from(statusFilter as Set<string>).length !== filterOptions.length) {
      filteredData = filteredData.filter((item) => {
        const statusValue = getObjectValue(item, "status");
        return Array.from(statusFilter as Set<string>).includes(statusValue);
      });
    }

    return filteredData;
  }, [data, filterValue, statusFilter, filterOptions]);

  // Cálculo de páginas
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  useEffect(() => {
    if (page > pages) {
      setPage(pages || 1);
    }
  }, [pages, page]);

  // Elementos de la página actual
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // Ordenamiento de elementos
  const sortedItems = useMemo(() => {
    // Si disableSorting está activado, devolver items sin ordenar
    if (disableSorting) {
      return items;
    }

    return [...items].sort((a, b) => {
      // Usar getObjectValue para obtener los valores de forma segura
      const first = getObjectValue(a, sortDescriptor.column as string);
      const second = getObjectValue(b, sortDescriptor.column as string);

      // Manejo especial para comparar números como strings
      if (typeof first === "string" && !isNaN(Number(first)) && typeof second === "string" && !isNaN(Number(second))) {
        const numA = Number(first);
        const numB = Number(second);
        const cmp = numA < numB ? -1 : numA > numB ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }

      // Comparación estándar
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // Callbacks para paginación
  const onNextPage = useCallback((): void => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback((): void => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newRowsPerPage = Number(e.target.value);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Resetear a la primera página
  }, []);

  // Callbacks para búsqueda
  const onSearchChange = useCallback((value: string): void => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback((): void => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          {/* Input de búsqueda */}
          <Input
            isClearable
            className="w-full sm:max-w-[40%]"
            placeholder={t("common:Comunes.Actions.Buscar")}
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            variant="bordered"
          />

          {/* Botones */}
          <div className="flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
            {filterOptions && (
              <Dropdown>
                <DropdownTrigger>
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat" className="w-full sm:w-auto justify-between sm:justify-center">
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Status Filter"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {filterOptions.map((option) => (
                    <DropdownItem key={option.uid} className="capitalize">
                      {capitalize(option.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}

            {/* Extras content */}
            {topContentExtras && <div className="flex">{topContentExtras}</div>}

            {/* Dropdown de columnas */}
            <Dropdown>
              <DropdownTrigger>
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat" className="w-full sm:w-auto justify-between sm:justify-center">
                  {t("common:Comunes.Campos.Columnas") || "Columnas"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {typeof column.name === 'string' ? capitalize(column.name) : column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, visibleColumns, onSearchChange, filterOptions, topContentExtras, columns, t]);

  // Contenido inferior
  const bottomContent = useMemo(() => {
    return (
      <div className="py-4 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-100 dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700">
        {/* Sección izquierda */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-between sm:justify-start items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total: <span className="font-medium text-gray-700 dark:text-gray-200">{data.length}</span>
          </span>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">{t("common:Comunes.Campos.Filas") || "Filas"}</label>
            <select
              title="Rows per page"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {[5, 10, 15, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          {!hideSelection && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedKeys === "all"
                ? t("common:Comunes.Campos.TodosSeleccionados") || "Todos seleccionados"
                : `${(selectedKeys as Set<string>).size} de ${filteredItems.length} seleccionados`}
            </span>
          )}
        </div>

        {/* Sección central - Paginación */}
        <div className="w-full sm:w-auto">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
            classNames={{
              item: "bg-transparent dark:bg-transparent",
              cursor: "bg-primary-500 dark:bg-primary-600",
              prev: "text-gray-700 dark:text-gray-200",
              next: "text-gray-700 dark:text-gray-200",
            }}
          />
        </div>

        {/* Sección derecha - Botones de navegación */}
        <div className="w-full sm:w-auto flex justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="ghost" onPress={onPreviousPage} className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            {t("common:Comunes.Campos.Previo") || "Anterior"}
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="ghost" onPress={onNextPage} className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            {t("common:Comunes.Campos.Siguiente") || "Siguiente"}
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, onNextPage, hideSelection, data.length, rowsPerPage, onRowsPerPageChange, t]);

  return (
    <Table
      isHeaderSticky
      aria-label="Generic table with custom cells and pagination"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[520px] bg-transparent overflow-x-auto sm:overflow-x-visible shadow-none border-none",
        table: "min-w-full",
        th: "text-xs sm:text-sm",
        td: "text-xs sm:text-sm",
        ...(className ? { base: className } : {}),
      }}
      selectedKeys={selectedKeys}
      selectionMode={hideSelection ? "none" : "multiple"}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns} className="bg-transparent border-b border-gray-800">
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} allowsSorting={!disableSorting && column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={t("common:Comunes.SinInformacion")} items={sortedItems} className="bg-transparent">
        {(item) => (
          <TableRow key={String(item.id)}>
            {(columnKey) => <TableCell>{renderCell ? renderCell(item, columnKey.toString()) : getObjectValue(item, columnKey.toString())}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
