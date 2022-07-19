import {Card} from '@mui/material';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import {BORDER_RADIUS, BOX_SHADOW} from '@src/styles/config';


const StyledWaveAudio = styled.div`
  margin-bottom: 25px;

  .audio-wave-card {
    border-radius: 0px;
    box-shadow: ${BOX_SHADOW};
    border: 1px solid ${COLOR.havelockBlue};
    margin-bottom: 10px;
    //height: 230px;
    padding: 5px 25px 5px 25px;

    .loading-waveform {
      width: 100%;
    }
    #waveform {
      width: 100%;
    }
    #wave-timeline {
      width: 100%;
    }
    .audio-action-button {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      width: 100%;
      .tooltipButton {
        height: 20px;
        width: 20px;
        text-transform: uppercase;
      }
      .iconButton {
        height: 20px;
        width: 20px;
        color: ${COLOR.black};
      }
    }
    .selected-duration-container {
      margin-top: 10px;
      width: 100%;
      display: flex;
      .selected-start-time {
        width: 50%;
        display: flex;
      }
      .selected-end-time {
        width: 50%;
        display: flex;
        justify-content: flex-end;
      }
      .label {
        display: flex;
        justify-content: flex-end;
        margin-right: 15px;
      }
      .value {
        min-width: 100px;
        border: 1px solid ${COLOR.black};
        border-radius: 4px;
        text-align: center;
      }
    }
    .action-button {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      .confirmButton {
        width: 90px;
      }
    }
  }
`;

const StyledResquestDetailInfoSectionCard = styled(Card)`
  min-width: 300px !important;
  max-width: 360px !important;
`;

const StyledAddCharacterDrawer = styled('div')`
  .add-character-drawer {
    border-radius: ${BORDER_RADIUS};
    font-size: 14px;
  }

  .customer-information {
    margin-bottom: 30px;
  }

  .info-customer {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 10px;
  }

  .info-provider {
    text-transform: capitalize;
  }

  .input-control {
    margin-bottom: 15px;

    .input-label {
      margin-bottom: 5px;
      font-weight: 600;
      color: ${COLOR.dark};
    }
  }

  .action-group {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
`;



export {
  StyledWaveAudio,
  StyledResquestDetailInfoSectionCard,
  StyledAddCharacterDrawer
};
