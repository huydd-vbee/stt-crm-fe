import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ProcessHandler from '@src/components/ProcessHandler';
import { InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import CustomDatePickerRangeNew from '@src/components/CustomDatePickerRangeNew';
import iconExcel from '@src/assets/icons/excel.png';
import AppCard from './AppCard';
import AppStatsCard from './AppStatsCard';
import { fakeData } from './fakeData';
import {
  ExcelButton,
  StyledAppDetail,
  StyledCardsContainer,
} from './index.style';

const initialApp = {
  name: '',
  admin: '',
  apiType: '',
  status: '',
  totalRequests: 0,
  totalCharacters: 0,
  successRate: 0,
  totalMoney: 0,
  initRequests: 0,
  successRequests: 0,
  failedRequests: 0,
  processingRequests: 0,
  failedCharacters: 0,
  successCharacters: 0,
  processingCharacters: 0,
  pendingCharacters: 0,
};

const initialCreatedAt = [null, null];

const initialFilter = {
  search: '',
  createdAt: initialCreatedAt,
};

const AppDetail = () => {
  const { appId } = useParams();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(initialFilter);
  const [app, setApp] = useState(initialApp);

  const handleChangeSearchFilter = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleChangeDatePickerRange = (value) => {
    const [startDate, endDate] = value;
    if (moment(startDate).isAfter(endDate)) return;
    setFilter({ ...filter, createdAt: value });
  };

  const handleResetFilterDate = () =>
    setFilter({ ...filter, createdAt: initialCreatedAt });

  const fetchApp = async () => {
    setLoading(true);
    const data = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(fakeData);
      }, 1000),
    );
    setApp(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApp();
  }, [appId]);

  return (
    <StyledAppDetail>
      <div className="styled-action-row">
        <TextField
          value={filter.search}
          name="search"
          size="small"
          placeholder={t('searchAppPlaceholder')}
          onChange={handleChangeSearchFilter}
          className="search-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <div className="styled-action-button">
          <ExcelButton
            variant="outlined"
            startIcon={<img src={iconExcel} alt="icon" />}
            color="secondary"
          >
            {t('exportExcel')}
          </ExcelButton>
          <CustomDatePickerRangeNew
            value={filter.createdAt}
            isRefresh
            onChange={handleChangeDatePickerRange}
            handleRefresh={handleResetFilterDate}
          />
        </div>
      </div>
      <ProcessHandler loading={loading}>
        {app?.name && (
          <StyledCardsContainer>
            <AppCard
              name={app.name}
              admin={app.admin}
              apiType={t(app.apiType)}
              status={app.status}
              totalRequests={app.totalRequests}
              totalCharacters={app.totalCharacters}
              successRate={app.successRate}
              totalMoney={app.totalMoney}
            />
            <AppStatsCard
              title="totalRequests"
              type="request"
              total={app.totalRequests}
              data={{
                initRequests: app.initRequests,
                successRequests: app.successRequests,
                failedRequests: app.failedRequests,
                processingRequests: app.processingRequests,
              }}
            />
            <AppStatsCard
              title="totalCharacters"
              type="characters"
              total={app.totalCharacters}
              data={{
                pendingCharacters: app.pendingCharacters,
                successCharacters: app.successCharacters,
                failedCharacters: app.failedCharacters,
                processingCharacters: app.processingCharacters,
              }}
            />
          </StyledCardsContainer>
        )}
      </ProcessHandler>
    </StyledAppDetail>
  );
};

export default AppDetail;
