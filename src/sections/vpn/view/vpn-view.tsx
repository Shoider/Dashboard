import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

//import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import Alerts from 'src/components/alerts';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { applyFilter, getComparator } from '../utils';
import { UserTableToolbar } from '../user-table-toolbar';

import type { UserProps } from '../user-table-row';


// ----------------------------------------------------------------------

export function VPNView() {

  const [alert, setAlert] = useState({
    message: "",
    severity: "",
  });
  const [openAlert, setOpenAlert] = useState(false);

  const table = useTable();

  const [filterName, setFilterName] = useState('');

  const [users, setUsers] = useState<UserProps[]>([]); // Estado para los datos de la API

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  // const notFound = !dataFiltered.length && !!filterName;

  // Llama a la API al montar el componente
  useEffect(() => {
    handleSubmit({ preventDefault: () => {} }); 
  }, []);

  // Llamada API
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    interface UserVPN {
      _id: number
      nombreEnlace: string;
      telefonoEnlace: string;
      nombreAutoriza: string;
      puestoAutoriza: string;
    }

    try {
      const VPNResponse = await axios.post<UserVPN[]>("api2/v1/vpnGet", {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (VPNResponse.status === 200) {
        setAlert({
          message: "Datos obtenidos con éxito",
          severity: "success",
        });
        setOpenAlert(true);

        setUsers(VPNResponse.data); // Actualiza el estado con los datos de la API
        //console.log("Datos obtenidos: ", VPNResponse.data);
        //console.log("Datos de correos: ", VPNResponse.data)
      } else {
        setAlert({
          message: "Algo salió mal",
          severity: "warning",
        });
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
      setAlert({
        message: "Ocurrió un error al procesar su solicitud.",
        severity: "error",
      });
      setOpenAlert(true);
    }
  };

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Registros VPN
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:refresh-3-line" />}
          onClick={handleSubmit}
        >
          Boton que actualiza los datos
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    users.map((user) => user._id.toString())
                  )
                }
                headLabel={[
                  { id: '_id', label: 'No. Formato' },
                  { id: 'nombreEnlace', label: 'Enlace'},
                  { id: 'telefonoEnlace', label: 'Teléfono'},
                  { id: 'nombreAutoriza', label: 'Autorizó'},
                  { id: 'puestoAutoriza', label: 'Puesto'},
                 // { id: 'status', label: 'Autorizó' },
                  { id: '' },
                ]}
              />
            <TableBody>
              {dataFiltered.length > 0 ? (
                dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row._id}
                      row={row}
                      selected={table.selected.includes(row._id.toString())}
                      onSelectRow={() => table.onSelectRow(row._id.toString())}
                    />
                  ))
              ) : (
                <TableNoData searchQuery={filterName} />
              )}
            </TableBody>

            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      {/* Mostrar alertas */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} pos="up" />
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
