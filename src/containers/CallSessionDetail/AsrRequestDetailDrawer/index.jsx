/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useSnackbar} from "notistack";

import { Button, TextField, Typography } from '@mui/material';
import CustomDrawer from '@src/components/Drawer';
import { useTranslation } from 'react-i18next';

import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';

import { isInteger } from '@src/utils/number';
import { useDispatch } from 'react-redux';
import actions from '@src/redux/actions';
import {PAGINATION_LIMIT} from "@src/constants";

import ConfigCard
  from "@src/containers/CallSessionDetail/AsrRequestDetailDrawer/ConfigCard";
import WaveAudio from "./WaveAudio";
import ResultCard from "./ResultCard";

import { StyledAddCharacterDrawer } from './index.style';


const AsrRequestDetailDrawer = ({
  open,
  appId,
  sessionId,
  requestId,
  onClose,
}) => {
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [asrRequest, setAsrRequest] = useState(null);
  const [fileBlob, setFileBlob] = useState(Buffer.from([]));

  const fetchAsrRequestDetail = async () => {
    setLoading(true);
    const requestDetails = await apis.request.getCallRequestDetails({
      appId,
      sessionId,
      requestId,
    });
    const requestAudioBuffer = await apis.request.getCallRequestAudio({
      appId,
      sessionId,
      requestId,
    })

    if (requestDetails.status && requestAudioBuffer.status) {
      // eslint-disable-next-line no-console
      console.info(requestDetails.result);
      // eslint-disable-next-line no-console
      console.info(requestAudioBuffer.result);

      setFileBlob(Buffer.from(requestAudioBuffer.result));
      setAsrRequest(requestDetails.result);
    } else {
      enqueueSnackbar(t('getAsrRequestDetailFailed'), { variant: 'error' });
    }

    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchAsrRequestDetail().catch((err) => console.error(err));
  }, [requestId]);

  return (
    <CustomDrawer
      title={t('asrRequestDetails')}
      open={open}
      onClose={onClose}
    >
      <StyledAddCharacterDrawer>
        <ProcessHandler loading={loading}>
          <WaveAudio audioFileBlob={fileBlob} />
          <ResultCard asrRequest={asrRequest} />
          <ConfigCard asrRequest={asrRequest} />
        </ProcessHandler>
      </StyledAddCharacterDrawer>
    </CustomDrawer>
  );
};

export default AsrRequestDetailDrawer;


// const handleResetForm = () => {
//   setExtraCharacters('');
//   setNote('');
//   setErrors({});
// };
//
// const handleChangeExtraCharacters = (event) => {
//   const { value } = event.target;
//   const checkIsNumber = isInteger(value);
//   if (checkIsNumber) {
//     setExtraCharacters(value);
//     if (!value) {
//       setErrors({ ...errors, extraCharacters: 'extraCharactersRequired' });
//     } else setErrors({ ...errors, extraCharacters: null });
//   } else {
//     setErrors({ ...errors, extraCharacters: 'extraCharactersInvalid' });
//   }
// };
//
// const handleChangeNote = (event) => {
//   const { value } = event.target;
//   setNote(value);
//   if (!value.trim()) setErrors({ ...errors, note: t('noteRequired') });
//   else setErrors({ ...errors, note: null });
// };
//
// const handleSubmit = async () => {
//   setLoading(true);
//   const data = await apis.users.addCharacters(
//     asrRequest.id,
//     Number(extraCharacters),
//     note,
//   );
//   if (data?.status) {
//     dispatch(
//       actions.noti.push({
//         severity: 'success',
//         message: 'addCharactersSuccess',
//       }),
//     );
//     handleResetForm();
//   } else {
//     dispatch(
//       actions.noti.push({
//         severity: 'error',
//         message: data.message || 'addCharactersFailed',
//       }),
//     );
//   }
//   onAddCharactersSuccess();
//   setLoading(false);
//   onClose();
// };


// <div className="customer-information">
//   <div className="info-customer">
//     <Typography variant="subtitle1">{t('customer')}: </Typography>
//     <Typography variant="body1">
//       {asrRequest.lastName} {asrRequest.firstName}
//     </Typography>
//   </div>
//   <div className="info-customer">
//     <Typography variant="subtitle1">
//       {t('remainingCharacters')}:
//     </Typography>
//     <Typography variant="body1">
//       {asrRequest?.remainingCharacters.toLocaleString()}
//     </Typography>
//   </div>
//   <div className="info-customer">
//     <Typography variant="subtitle1">{t('provider')}:</Typography>
//     <Typography variant="body1" className="info-provider">
//       {asrRequest.identityProvider}
//     </Typography>
//   </div>
//   {asrRequest.email && (
//     <div className="info-customer">
//       <Typography variant="subtitle1">{t('email')}:</Typography>
//       <Typography variant="body1">{asrRequest.email}</Typography>
//     </div>
//   )}
//   {asrRequest.phoneNumber && (
//     <div className="info-customer">
//       <Typography variant="subtitle1">{t('phoneNumber')}:</Typography>
//       <Typography variant="body1">{asrRequest.phoneNumber}</Typography>
//     </div>
//   )}
// </div>
// <div className="input-control">
//   <Typography className="input-label">
//     {t('extraCharacters')} *
//   </Typography>
//   <TextField
//     size="small"
//     disabled={loading}
//     fullWidth
//     placeholder={t('addExtraCharactersPlaceholder')}
//     className="add-character-drawer"
//     value={extraCharacters}
//     helperText={t(errors.extraCharacters)}
//     error={!!errors.extraCharacters}
//     onChange={handleChangeExtraCharacters}
//   />
// </div>
// <div className="input-control">
//   <Typography className="input-label">{t('note')} *</Typography>
//   <TextField
//     size="small"
//     disabled={loading}
//     fullWidth
//     className="add-character-drawer"
//     placeholder={t('notePlaceholder')}
//     multiline
//     rows="8"
//     value={note}
//     error={!!errors.note}
//     helperText={t(errors.note)}
//     onChange={handleChangeNote}
//   />
// </div>
// <div className="action-group">
//   <Button
//     size="small"
//     disabled={!extraCharacters || !note.trim() || loading}
//     variant="contained"
//     onClick={handleSubmit}
//   >
//     <ProcessHandler size={25} loading={loading}>
//       {t('createNow')}
//     </ProcessHandler>
//   </Button>
//   <Button size="small" variant="outlined" onClick={handleResetForm}>
//     {t('reset')}
//   </Button>
// </div>
