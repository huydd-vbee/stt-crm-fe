import React, { useEffect, useState } from 'react';
import StatsCard from '@src/components/StatsCard';
import { useTranslation } from 'react-i18next';
import iconTotalRevenue from '@src/assets/icons/icon-total-revenue.png';
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
import OrderTable from './OrderTable';
import CreateOrder from './CreateOrder';

// eslint-disable-next-line no-unused-vars
import {fakeOrders} from "./fakeData";

const Order = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(ORDER_STATUS.PAID);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [paging, setPaging] = useState({ page: 1, total: 0 });
  const [openCreateOrder, setOpenCreateOrder] = useState(false);
  const dispatch = useDispatch();

  const handleChangePage = (newPage) => setPaging({ ...paging, page: newPage });

  const fetchOrders = async () => {
    setLoading(true);
    const data = await apis.orders.getOrders({
      limit: PAGINATION_LIMIT,
      offset: (paging.page - 1) * PAGINATION_LIMIT,
      status: activeTab,
      sort: 'createdAt_desc',
    });
    if (data.status) {
      setOrders(data.result.orders);
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

  const handleOpenCreateOrder = () => setOpenCreateOrder(true);

  const handleCloseCreateOrder = () => setOpenCreateOrder(false);

  const exportOrders = async () => {
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
    fetchOrders();
  }, [paging.page, activeTab]);

  const tabs = [
    {
      label: t('successOrder'),
      id: ORDER_STATUS.PAID,
    },
    {
      label: t('failedOrder'),
      id: ORDER_STATUS.CANCEL,
    },
    {
      label: t('pendingOrder'),
      id: ORDER_STATUS.PENDING,
    },
  ];

  const renderOrderAction = (
    <StyleButtonsAction>
      <Button
        variant="outlined"
        startIcon={<img src={iconExcel} alt="icon" />}
        color="secondary"
        onClick={exportOrders}
      >
        {t('exportExcel')}
      </Button>
      <Button
        variant="contained"
        startIcon={<AddCircle />}
        onClick={handleOpenCreateOrder}
      >
        {t('createOrder')}
      </Button>
    </StyleButtonsAction>
  );

  return (
    <div>
      <StatsCard
        title={t('totalRevenue')}
        number="91.265.007 VNĐ"
        icon={iconTotalRevenue}
        width="21.5%"
        minWidth="235px"
      />
      <SuperTabs
        tabs={tabs}
        onChangeTab={handleChangeTab}
        actionComponents={renderOrderAction}
      />
      <ProcessHandler loading={loading}>
        <OrderTable
          orders={orders}
          onChangePage={handleChangePage}
          paging={paging}
        />
      </ProcessHandler>
      <CreateOrder open={openCreateOrder} onClose={handleCloseCreateOrder} />
    </div>
  );
};

export default Order;
