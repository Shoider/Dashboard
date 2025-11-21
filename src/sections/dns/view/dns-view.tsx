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

//import { _users } from 'src/_mock'; //MODIFICAR ESTO, YA QUE ES LO QUE OBTIENE LOS DATOS DE LA TABLA
import { DashboardContent } from 'src/layouts/dashboard';

import Alerts from 'src/components/alerts'
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { applyFilter, getComparator } from '../utils';
import { UserTableToolbar } from '../user-table-toolbar';

import type { UserProps } from '../user-table-row';

// ----------------------------------------------------------------------

export function DNSView() {

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

    interface DNSResponse {
      _id: number
      nombreUsuario: string;
      nombreResponsable: string;
      registro: string;
      IP: string;
    }

    try {
      const DNSResponse = await axios.post<DNSResponse[]>("api2/v1/dnsGet", {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (DNSResponse.status === 200) {
        setAlert({
          message: "Datos obtenidos con éxito",
          severity: "success",
        });
        setOpenAlert(true);

        setUsers(DNSResponse.data); // Actualiza el estado con los datos de la API
        //console.log("Datos obtenidos: ", TelefoniaResponse.data);
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
          Registros de servicios de DNS
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:refresh-3-line" />}
          onClick={handleSubmit}
        >
          Botón que actualiza los datos
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
                  { id: 'nombreUsuario', label: 'Solicitante' },
                  { id: 'nombreResponsable', label: 'Responsable' },
                  { id: 'registro', label: 'Registro'},
                  { id: 'IP', label: 'IP' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.length>0 ?(
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
                ):(
                  <TableNoData searchQuery={filterName} />
                  
                )
                }
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
