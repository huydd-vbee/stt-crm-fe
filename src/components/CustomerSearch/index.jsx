import React, { useState, useEffect, useRef } from 'react';
import {
  Autocomplete,
  CircularProgress,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import apis from '@src/apis';
import debounce from '@src/utils/debounce';
import BadgeAvatar from '@src/components/BadgeAvatar';

import { StyledAutoComplete } from './index.style';

const SEARCH_ROW_LIMIT = 5;

/**
 * Search customer with AutoComplete component
 * @param {*} customer: active customer object
 * @param {*} error: the help text when you want to show error at the bottom of input: example: customerRequired
 * @param {*} onChange: triggers event when customer be changed
 */
const CustomerSearch = ({ customer, error, onChange }) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const inputRef = useRef(null);

  const getDisplayText = (user) => {
    if (!user) return '';
    return `${user.lastName} ${user.firstName}`;
  };

  const fetchUsers = async () => {
    if (!search) {
      setUsers([]);
      return;
    }

    // When user be selected, search will be set to value of getDisplayText
    // then do not fetchData when match this condition
    const displayText = getDisplayText(customer);
    if (displayText === search && users) return;

    setLoading(true);
    const data = await apis.users.getUsers({
      searchFields: 'firstName,lastName,phoneNumber,email',
      search,
      limit: SEARCH_ROW_LIMIT,
    });
    setLoading(false);
    if (data?.status) {
      setUsers(data.result.users);
    }
  };

  const getUserContactInformation = (user) => {
    const { phoneNumber, email } = user;
    if (phoneNumber && email)
      return (
        <>
          <span>
            {t('phoneNumberShortTitle')}: {phoneNumber}
          </span>
          <br />
          <span>Email: {email}</span>
        </>
      );

    if (email) return `Email: ${email}`;
    if (phoneNumber) return `${t('phoneNumberShortTitle')}: ${phoneNumber}`;
    return '';
  };

  const handleChangeInput = (event) => {
    setSearch(event.target.value);
  };

  const handleCloseList = () => {
    setOpen(false);
    inputRef.current?.blur();
    if (customer) {
      const displayText = getDisplayText(customer);
      if (displayText === search) return;
      onChange(null);
    }
  };

  const handleFocusInput = () => {
    setOpen(true);
  };

  const handleBlurInput = () => {
    handleCloseList();
  };

  const handleSelectUser = (user) => {
    setOpen(false);
    setUsers([user]);
    setSearch(getDisplayText(user));
    onChange(user);
  };

  useEffect(() => {
    debounce(fetchUsers, 500)(search);
  }, [search]);

  return (
    <StyledAutoComplete>
      <Autocomplete
        id="customer-input"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, val) => option.id === val.id}
        options={users}
        loading={loading}
        value={customer}
        size="small"
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            name="customer-input"
            fullWidth
            value={search}
            inputRef={inputRef}
            placeholder={t('accountPlaceholder')}
            onChange={handleChangeInput}
            onBlur={handleBlurInput}
            onFocus={handleFocusInput}
            helperText={t(error)}
            error={!!error}
            InputProps={{
              ...params.InputProps,
              endAdornment: loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : null,
            }}
          />
        )}
        getOptionLabel={(option) => getDisplayText(option)}
        renderOption={(props, option) => (
          <ListItemButton
            key={option.id}
            onClick={() => handleSelectUser(option)}
          >
            <ListItemAvatar>
              <BadgeAvatar
                img={option.avatar}
                number={new Date(option.createdAt)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={getDisplayText(option)}
              secondary={getUserContactInformation(option)}
            />
          </ListItemButton>
        )}
      />
    </StyledAutoComplete>
  );
};

export default CustomerSearch;
