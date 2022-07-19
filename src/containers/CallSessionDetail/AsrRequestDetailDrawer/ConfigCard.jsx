import React from 'react';
import {useTranslation} from 'react-i18next';
import IconAsrConfigHeader from '@src/assets/icons/stt-icon-filled.PNG';
import IconVadConfigHeader from '@src/assets/icons/vad-icon.png';
import IconAudioConfigHeader from '@src/assets/icons/audio-icon.png';
import CardComponent from '@src/components/CardComponent';
import {StyledResquestDetailInfoSectionCard} from "@src/containers/CallSessionDetail/AsrRequestDetailDrawer/index.style";

const ConfigCard = ({asrRequest}) => {
  const {t} = useTranslation();
  const requestConfig = asrRequest.config.specification;

  const vadConfig = requestConfig.configAudio.vadParams && !requestConfig.configAudio.vadParams.skip
    ? ([
      {
        name: t('Skip'),
        content: `False`,
        align: "right"
      },
      {
        name: t('noInputTimeout'),
        content: `${requestConfig?.configAudio.vadParams.noInputTimeoutMs || '--'} `,
        align: "right"
      },
      {
        name: t('fileKey'),
        content: `${requestConfig?.configAudio.vadParams.speechCompleteTimeoutMs || '--'}`,
        align: "right"
      },
    ])
    : ([
      {
        name: t('Skip'),
        content: `True`,
        align: "right"
      },
    ]);

  const asrConfig = [
    {
      name: t('model'),
      content: `${requestConfig?.model || '--'} `,
      align: "right"
    },
    {
      name: t('domain'),
      content: `${requestConfig?.domain || '--'}`,
      align: "right"
    },
    {
      name: t('joint'),
      content: `${requestConfig?.joint || '--'}`,
      align: "right"
    },
  ];

  const audioConfig = [
    {
      name: t('sampleRateHertz'),
      content: `${requestConfig?.configAudio.sampleRateHertz || '--'} `,
      align: "right"
    },
    {
      name: t('sampleSizeByte'),
      content: `${requestConfig?.configAudio.sampleSizeByte || 2 }`,
      align: "right"
    },
    {
      name: t('channels'),
      content: `${requestConfig?.configAudio.channel || 1 }`,
      align: "right"
    },
  ];

  return (
    <div>
      <StyledResquestDetailInfoSectionCard>
        <CardComponent
          rows={vadConfig}
          title={`${t('vadConfig')}`}
          iconHeader={IconVadConfigHeader}
        />
      </StyledResquestDetailInfoSectionCard>
      <StyledResquestDetailInfoSectionCard>
        <CardComponent
          rows={asrConfig}
          title={`${t('asrConfig')}`}
          iconHeader={IconAsrConfigHeader}
        />
      </StyledResquestDetailInfoSectionCard>
      <StyledResquestDetailInfoSectionCard>
        <CardComponent
          rows={audioConfig}
          title={`${t('audioConfig')}`}
          iconHeader={IconAudioConfigHeader}
        />
      </StyledResquestDetailInfoSectionCard>
    </div>
  );
};

export default ConfigCard;
