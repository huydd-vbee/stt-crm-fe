import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconHeader from '@src/assets/icons/info-icon.png';
import CardComponent from '@src/components/CardComponent';
import { StyledResquestDetailInfoSectionCard } from './index.style';

const ResultCard = ({ asrRequest }) => {
  const { t } = useTranslation();
  const [asrRequestResult, setAsrRequestResult] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.info(asrRequest);
    setAsrRequestResult([
      {
        name: t('transcript'),
        content: `${asrRequest?.message.text || '--'} `,
      }, {
        name: t('fileKey'),
        content: `${asrRequest?.message.audioPath || '--'}`,
      },
    ]);
  }, [asrRequest])

  return (
    <StyledResquestDetailInfoSectionCard>
      <CardComponent
        rows={asrRequestResult}
        title={`${t('asrRequestResult')}`}
        iconHeader={IconHeader}
      />
    </StyledResquestDetailInfoSectionCard>
  )
};

export default ResultCard;
