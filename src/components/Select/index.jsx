import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { StyledSelectWrapper, StyledTypography } from './index.style';
/**
 *
 * @param {*} label:string required : label of select,
 * @param {*} data: [{label: string, value: any}] required : options in select,
 * @param {*} name: string: required : field select,
 * @param {*} value: {label: string, value: any} required : value of select,
 * @param {*} width: string, optional, xx px,
 * @param {*} handleChangeFilter callback function: required, update state
 * @returns
 */
const SelectComponent = ({
  label,
  data,
  name,
  value,
  width,
  handleChangeFilter,
}) => (
  <StyledSelectWrapper width={width}>
    <TextField
      size="small"
      className="choose-provider"
      variant="outlined"
      value={value}
      name={name}
      select
      label={label}
      onChange={(e) => handleChangeFilter({ name, value: e.target.value })}
    >
      {data.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <StyledTypography>{option.label}</StyledTypography>
        </MenuItem>
      ))}
    </TextField>
  </StyledSelectWrapper>
);

export default SelectComponent;
