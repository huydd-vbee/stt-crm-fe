import React, { useState } from 'react';
import moment from 'moment';
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { KeyboardArrowDown, Loop } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DATE_TIME_PICKER_TYPES } from '@src/constants';
import { StyledCustomDatePickerRange } from './index.style';

const CustomDatePicker = ({
  type,
  selectedDate,
  handleChangeDate,
  minDate,
  maxDate,
}) => (
  <>
    {type === DATE_TIME_PICKER_TYPES.DATE && (
      <DatePicker
        value={selectedDate}
        onChange={handleChangeDate}
        inputFormat="dd/MM/yyyy"
        InputAdornmentProps={{ position: 'end' }}
        minDate={minDate}
        maxDate={maxDate}
        renderInput={(params) => <TextField size="small" {...params} />}
      />
    )}
    {type === DATE_TIME_PICKER_TYPES.TIME && (
      <TimePicker
        value={selectedDate}
        onChange={handleChangeDate}
        inputFormat="HH:mm"
        InputAdornmentProps={{ position: 'end' }}
        minTime={minDate}
        maxTime={maxDate}
        ampm={false}
        renderInput={(params) => <TextField size="small" {...params} />}
      />
    )}
    {type === DATE_TIME_PICKER_TYPES.DATE_TIME && (
      <DateTimePicker
        value={selectedDate}
        onChange={handleChangeDate}
        inputFormat="dd/MM/yyyy HH:mm"
        renderInput={(params) => <TextField {...params} />}
        InputAdornmentProps={{ position: 'start' }}
        minDateTime={minDate}
        maxDateTime={maxDate}
        ampm={false}
      />
    )}
  </>
);

const CustomDatePickerRange = ({
  type = DATE_TIME_PICKER_TYPES.DATE,
  value = [null, null],
  isRefresh,
  helperText,
  error,
  minDate,
  maxDate,
  isMenu = true,
  margin,
  width,
  onChange,
  handleRefresh,
}) => {
  const { t } = useTranslation();
  const [anchorSelectDay, setAnchorSelectDay] = useState(null);
  const handleClickSelectDay = (e) => setAnchorSelectDay(e.currentTarget);
  const handleCloseSelectDay = () => setAnchorSelectDay(null);
  const handleChange = (label) => (newValue) => {
    if (!newValue || !newValue?.getDate() || !onChange) return;
    if (label === 'startDate') {
      if (newValue !== value[0]) onChange([newValue, value[1]]);
    } else if (newValue !== value[1]) onChange([value[0], newValue]);
  };

  const optionsDatePicker = [
    {
      label: t('today'),
      startDate: moment().toString(),
      endDate: moment().toString(),
    },
    {
      label: t('lastWeek'),
      startDate: moment().subtract(7, 'd').toString(),
      endDate: moment().toString(),
    },
    {
      label: t('30DaysAgo'),
      startDate: moment().subtract(30, 'd').toString(),
      endDate: moment().toString(),
    },
    {
      label: t('thisMonth'),
      startDate: moment().startOf('month').toString(),
      endDate: moment().toString(),
    },
    {
      label: t('lastMonth'),
      startDate: moment().subtract(1, 'months').startOf('month').toString(),
      endDate: moment().subtract(1, 'months').endOf('month').toString(),
    },
    {
      label: t('90DaysAgo'),
      startDate: moment().subtract(90, 'd').toString(),
      endDate: moment().toString(),
    },
    {
      label: t('thisYear'),
      startDate: moment().startOf('year').toString(),
      endDate: moment().toString(),
    },
  ];

  const handleSelectDay = (startDate, endDate) => {
    onChange([startDate, endDate]);
    handleCloseSelectDay();
  };

  return (
    <StyledCustomDatePickerRange error={error} margin={margin} width={width}>
      <div className="date-picker-range">
        <div className="date-picker-wrapper">
          <div className="date-range">
            <div className="input-wrapper">
              <CustomDatePicker
                type={type}
                selectedDate={value[0]}
                handleChangeDate={handleChange('startDate')}
                minDate={minDate && new Date(minDate)}
                maxDate={value[1] && new Date(value[1])}
              />
              <Typography className="light-color">{t('to')}</Typography>
              <CustomDatePicker
                type={type}
                selectedDate={value[1]}
                handleChangeDate={handleChange('endDate')}
                minDate={value[0] && new Date(value[0])}
                maxDate={maxDate && new Date(maxDate)}
              />
              {isMenu && (
                <KeyboardArrowDown
                  className="icon light-color"
                  onClick={handleClickSelectDay}
                />
              )}
              <Menu
                anchorEl={anchorSelectDay}
                open={Boolean(anchorSelectDay)}
                onClose={handleCloseSelectDay}
              >
                {optionsDatePicker.map((option) => (
                  <MenuItem
                    key={option.label}
                    value={option.label}
                    onClick={() =>
                      handleSelectDay(option.startDate, option.endDate)
                    }
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          {error && (
            <Typography className="helper-text">{helperText}</Typography>
          )}
        </div>
        <div className="refresh">
          {isRefresh && (
            <IconButton
              aria-label="refresh"
              className="light-color"
              onClick={handleRefresh}
            >
              <Loop />
            </IconButton>
          )}
        </div>
      </div>
    </StyledCustomDatePickerRange>
  );
};
export default CustomDatePickerRange;
