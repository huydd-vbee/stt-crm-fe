/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';
import WaveSurfer from 'wavesurfer.js';
// eslint-disable-next-line import/extensions
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import {
  Tooltip,
  IconButton,
} from '@mui/material';

import {
  PlayArrow,
  Pause,
} from '@mui/icons-material';

import {msToTime} from '@src/utils/date';
import {StyledWaveAudio} from './index.style';

export default function WaveAudio({audioFileBlob}) {
  // eslint-disable-next-line no-unused-vars
  const {enqueueSnackbar} = useSnackbar();
  const wavesurferRef = useRef(null);
  const timelineRef = useRef(null);
  const [wavesurferObj, setWavesurferObj] = useState();
  const [playing, setPlaying] = useState({
    playing: false,
    type: 'playAll', // type: 'playRegion'
  });
  const [fileBlob, setFileBlob] = useState(Buffer.from(audioFileBlob));
  // eslint-disable-next-line no-unused-vars
  const [waveformWidth, setWaveformWidth] = useState(window.innerWidth);
  const [duration, setDuration] = useState(0);
  const {t} = useTranslation();

  const handlePlayPause = (e) => {
    wavesurferObj.playPause();
    setPlaying((prev) => ({playing: !prev.playing}));
  };

  function getZoomRatio() {
    const durInSec = duration * 1000;
    const pxPerSec = Math.floor((waveformWidth / durInSec) % 20) * 20;
    return pxPerSec;
  }

  useEffect(() => {
    if (wavesurferRef.current && !wavesurferObj) {
      setWavesurferObj(
        WaveSurfer.create({
          container: '#waveform',
          scrollParent: true,
          autoCenter: true,
          cursorColor: '#000034',
          waveColor: '#4991e2',
          progressColor: '#000034',
          responsive: true,
          partialRender: true,
          plugins: [
            TimelinePlugin.create({
              container: '#wave-timeline',
              timeInterval: 0.2
            }),
          ],
        }),
      );
    }
  }, [wavesurferRef, wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj && fileBlob) {
      wavesurferObj.loadBlob(new Blob([fileBlob]));
    }
  }, [wavesurferObj, fileBlob]);

  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.on('ready', () => {
        setDuration(wavesurferObj.getDuration());
        wavesurferObj.zoom(getZoomRatio());
      });
    }
    return () => {
      if (wavesurferObj) wavesurferObj.pause();
    };
  }, [wavesurferObj]);

  return (
    <StyledWaveAudio>
      <div className="audio-wave-card">
        <div ref={wavesurferRef} id="waveform"/>
        <div ref={timelineRef} id="wave-timeline"/>
        <div className="audio-action-button">
          {playing.playing ? (
            <Tooltip title={t('pauseAudio')} className="tooltipButton">
              <IconButton onClick={handlePlayPause}>
                <Pause className="iconButton"/>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title={t('playAudio')} className="tooltipButton">
              <IconButton onClick={handlePlayPause}>
                <PlayArrow className="iconButton"/>
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </StyledWaveAudio>
  );
}

// <Grid item xs={12} sm={12}>
//   <div className="selected-duration-container">
//     <div className="selected-start-time">
//       <div className="label">{t('Duration')}:</div>
//       <div className="value">{msToTime(duration * 1000)}</div>
//     </div>
//     <div className="selected-end-time">
//       <div className="label">{t('File Size (Bytes)')}:</div>
//       <div className="value">{fileBlob.length}</div>
// {/*    </div> */}
// {/*  </div> */}
// {/* </Grid> */}
