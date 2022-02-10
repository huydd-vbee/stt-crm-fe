import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import customerIcon from '@src/assets/icons/customer-circle.png';
import StatsCard from '@src/components/StatsCard';
import Table from '@src/components/Table';
import { demoTableData } from './fakeData';

const columns = [
  {
    field: 'name', // required
    title: 'Name',
    sortable: false,
    align: 'left',
    render: (rowData) => <Typography>{rowData.name}</Typography>,
  },
  {
    field: 'birthYear',
    title: 'Birth Year',
    sortable: true,
    align: 'left',
  },
  {
    field: 'birthCity',
    title: 'Birth City',
    sortable: false,
    align: 'center',
  },
];

const Dashboard = () => {
  const { keycloak } = useKeycloak();
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => setPage(newPage);

  return (
    <div>
      {keycloak.authenticated && (
        <div>
          <Button
            variant="contained"
            onClick={() => keycloak.accountManagement()}
          >
            account management
          </Button>
          <Button variant="outlined" onClick={() => keycloak.logout()}>
            logout
          </Button>

          {/* Demo using StatsCard */}
          <StatsCard
            title="Tổng khách hàng"
            number="400.000"
            icon={customerIcon}
            width="21.5%"
            minWidth="235px"
          />

          {/* Demo using Table */}
          <Table
            columns={columns}
            data={demoTableData}
            total={14}
            page={page}
            showNumber
            onChangePage={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
