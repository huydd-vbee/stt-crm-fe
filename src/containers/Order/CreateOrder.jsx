import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apis from '@src/apis';
import { PACKAGE_DURATION, PACKAGE_LEVEL } from '@src/constants/package';
import CustomDrawer from '@src/components/Drawer';
import CustomerSearch from '@src/components/CustomerSearch';

import { StyledCreateOrder, StyledMenuItem } from './index.style';

const CreateOrder = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const renderPackageCode = (packageCode) => {
    // eslint-disable-next-line no-unused-vars
    const [type, level, duration] = packageCode.split('-');
    const levelKey = PACKAGE_LEVEL[level];
    if (!duration) return t(levelKey);

    const durationKey = PACKAGE_DURATION[duration];
    return `${t(levelKey)} - ${t(durationKey)}`;
  };

  const handleChangeCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const fetchPackages = async () => {
    const data = await apis.packages.getPackages({});
    if (data?.status) {
      setPackages(data.result.packages);
    }
  };

  useEffect(() => {
    if (open && !packages.length) fetchPackages();
  }, [open]);

  return (
    <CustomDrawer title={t('createOrder')} open={open} onClose={onClose}>
      <StyledCreateOrder>
        <div className="input-control">
          <Typography className="input-label">{t('account')}</Typography>
          <CustomerSearch
            customer={selectedCustomer}
            onChange={handleChangeCustomer}
          />
        </div>
        <div className="input-control">
          <Typography className="input-label">{t('package')}</Typography>
          <TextField
            name="package"
            value=""
            placeholder={t('packagePlaceholder')}
            size="small"
            fullWidth
            select
          >
            {packages &&
              packages.map((item) => (
                <StyledMenuItem key={item.id} value={item.id}>
                  {renderPackageCode(item.code)}
                </StyledMenuItem>
              ))}
          </TextField>
        </div>
        <div className="input-control">
          <Typography className="input-label">{t('totalPrice')}</Typography>
          <TextField
            name="totalPrice"
            value=""
            placeholder={t('pricePlaceholder')}
            size="small"
            fullWidth
          />
        </div>
        <div className="input-control">
          <Typography className="input-label">
            {t('numberOfCharacters')}
          </Typography>
          <TextField
            name="numberOfCharacters"
            value=""
            placeholder={t('numberOfCharactersPlaceholder')}
            size="small"
            fullWidth
          />
        </div>
        <div className="input-control">
          <Typography className="input-label">
            {t('expiryDateLabel')}
          </Typography>
          <TextField
            name="expiryDate"
            type="date"
            value=""
            placeholder="dd/mm/yy"
            size="small"
            fullWidth
          />
        </div>
        <div className="input-control">
          <Typography className="input-label">{t('note')}</Typography>
          <TextField
            name="expiryDate"
            type="text"
            value=""
            placeholder={t('notePlaceholder')}
            size="small"
            fullWidth
            multiline
            rows="8"
          />
        </div>
        <div className="action-group">
          <Button size="small" variant="contained">
            {t('createNow')}
          </Button>
          <Button size="small" variant="outlined">
            {t('reset')}
          </Button>
        </div>
      </StyledCreateOrder>
    </CustomDrawer>
  );
};

export default CreateOrder;
