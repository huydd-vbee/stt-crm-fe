import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import { StyledDetailOrderContainer } from './index.style';
import OrderDetailComponent from './OrderDetailComponent';
import AccountInformationCard from './AccountInformationCard';
import DetailInvoiceCard from './DetailInvoiceCard';

const DetailOrder = () => {
  const { t } = useTranslation();
  const { orderId } = useParams();

  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const fetchOrder = async () => {
    setLoading(true);
    const data = await apis.orders.getDetailOrder(orderId);
    if (data.status) setOrder(data.result);
    else {
      enqueueSnackbar(t('getOrderDetailFailed'), { variant: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <ProcessHandler loading={loading}>
      <StyledDetailOrderContainer>
        <div className="container">
          <div>
            <OutlinedInput
              id="outlined-adornment-weight"
              className="input-order-code"
              placeholder="Nhập mã đơn hàng"
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <div>
              <Typography variant="h6" className="title-style">
                {t('orderInformation')}
              </Typography>
              {order && <OrderDetailComponent orderData={order} />}
            </div>
          </div>
          <div>
            <div className="user">
              {order?.user && (
                <div className="">
                  <Typography variant="h6" className="title-style">
                    {t('orderInformation')}
                  </Typography>
                  <AccountInformationCard userData={order.user} />
                </div>
              )}
            </div>
            {order?.invoice && <DetailInvoiceCard invoice={order.invoice} />}
          </div>
        </div>
      </StyledDetailOrderContainer>
    </ProcessHandler>
  );
};
export default DetailOrder;
