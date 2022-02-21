import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SuperTabs from '@src/components/Tabs';
import { Button } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import iconExcel from '@src/assets/icons/excel.png';
import { ORDER_STATUS } from '@src/constants/order';
import { useDispatch } from 'react-redux';
import { PAGINATION_LIMIT } from '@src/constants';
import actions from '@src/redux/actions';
import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import { StyleButtonsAction } from './index.style';
import PackageTable from './PackageTable';
import CreatePackage from './CreatePackage';

const Package = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(ORDER_STATUS.PAID);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [paging, setPaging] = useState({ page: 1, total: 0 });
  const [openCreatePackage, setOpenCreatePackage] = useState(false);
  const dispatch = useDispatch();

  const handleChangePage = (newPage) => setPaging({ ...paging, page: newPage });

  const fetchPackages = async () => {
    // setLoading(true);
    const data = await apis.orders.getOrders({
      limit: PAGINATION_LIMIT,
      offset: (paging.page - 1) * PAGINATION_LIMIT,
      status: activeTab,
      sort: 'createdAt_desc',
    });
    if (data.status) {
      setPackages(data.result.orders);
      setPaging({ ...paging, total: data.result.total });
    } else {
      dispatch(actions.noti.push({ severity: 'error', code: data.code }));
    }
    setLoading(false);
  };

  const handleChangeTab = (value) => {
    setActiveTab(value);
    setPaging({ ...paging, page: 1 });
  };

  const handleOpenCreatePackage = () => setOpenCreatePackage(true);

  const handleCloseCreatePackage = () => setOpenCreatePackage(false);

  const exportPackages = async () => {
    const data = await apis.orders.exportExcelFile({
      status: activeTab,
    });

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ORDER-${activeTab}.xlsx`);
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    fetchPackages();
  }, [paging.page, activeTab]);

  const tabs = [
    {
      label: t('packageManagement'),
      id: ORDER_STATUS.PAID,
    },
  ];

  const renderPackageAction = (
    <StyleButtonsAction>
      <Button
        variant="outlined"
        startIcon={<img src={iconExcel} alt="icon" />}
        color="secondary"
        onClick={exportPackages}
      >
        {t('exportExcel')}
      </Button>
      <Button
        variant="contained"
        startIcon={<AddCircle />}
        onClick={handleOpenCreatePackage}
      >
        {t('createPackage')}
      </Button>
    </StyleButtonsAction>
  );

  return (
    <div>
      <SuperTabs
        tabs={tabs}
        onChangeTab={handleChangeTab}
        actionComponents={renderPackageAction}
      />
      <ProcessHandler loading={loading}>
        <PackageTable
          orders={packages}
          onChangePage={handleChangePage}
          paging={paging}
        />
      </ProcessHandler>
      <CreatePackage
        open={openCreatePackage}
        onClose={handleCloseCreatePackage}
      />
    </div>
  );
};

export default Package;
