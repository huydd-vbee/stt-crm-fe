import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IconButton, Typography } from '@mui/material';
import { isValidFile } from '@src/utils/checkValid';
import { Clear } from '@mui/icons-material';
import ImageBanner from '@src/assets/images/image-banner.png';
import { abbreviateNumber } from '@src/utils/number';
import { StyledFileDropzone } from './index.style';

const MEGA_BYTE = 15 * 1024 * 1024;

const FileDropzone = ({
  fileUrl,
  clearFile,
  fileType,
  acceptFile,
  disabled,
  onAddFile,
  onClearFile,
  onDeleteFile,
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [oversize, setOverSize] = useState(false);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

  const isValidSize = (size) => size <= MEGA_BYTE;

  const handleReset = () => {
    onDeleteFile(null);
    setFile(null);
    setPreview(null);
    setFormatError(false);
    setOverSize(false);
    setHighlight(false);
  };

  const handleChangeFile = (e) => {
    const { files } = e.target;
    handleReset();
    if (!files || files.length !== 1) return;
    if (!isValidFile(files[0].name, fileType)) {
      setFormatError(true);
      return;
    }
    if (!isValidSize(files[0].size)) {
      setOverSize(true);
      return;
    }
    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);
    setFile(files[0]);
    onAddFile(files[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const onDragLeave = () => setHighlight(false);

  const onDrop = (e) => {
    e.preventDefault();
    handleReset();
    const { files } = e.dataTransfer;
    if (!files || files.length !== 1) return;
    if (!isValidFile(files[0].name, fileType)) {
      setFormatError(true);
      return;
    }
    if (!isValidSize(files[0].size)) {
      setOverSize(true);
      return;
    }
    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);
    setFile(files[0]);
    onAddFile(files[0]);
  };

  const openFileDialog = () => fileInputRef.current.click();

  const UploadSuccess = () => (
    <div
      className="upload-success"
      onClick={(e) => e.stopPropagation()}
      role="presentation"
    >
      <div className="preview-image-upload">
        <img src={preview || fileUrl} className="preview-image" alt="upload" />
      </div>
      <div className="image-action">
        <div className="image-info">
          <Typography variant="body1">{file.name}</Typography>
          <Typography variant="body1">
            {abbreviateNumber(file.size)}B
          </Typography>
        </div>
        <IconButton
          aria-label="delete"
          disabled={disabled}
          color="primary"
          onClick={handleReset}
        >
          <Clear />
        </IconButton>
      </div>
    </div>
  );

  const UploadError = () => (
    <>
      <Typography variant="body1" className="allow-format-file">
        {t('allowedFileFormats', { fileType: fileType.join(', ') })}
      </Typography>
      {formatError && (
        <Typography variant="subtitle2" color="error">
          {t('onlyUpload', { fileType: fileType.join(', ') })}
        </Typography>
      )}
      {oversize && (
        <Typography variant="subtitle2" color="error">
          {t('oversizeError')}
        </Typography>
      )}
    </>
  );

  const UploadNote = () => (
    <div className="upload-note">
      <img
        src={fileUrl || ImageBanner}
        className="preview-image"
        alt="banner"
      />
      <Typography variant="body2">{t('uploadNote')}</Typography>
    </div>
  );

  useEffect(() => {
    if (clearFile) {
      handleReset();
      onClearFile(false);
    }
  }, [clearFile]);

  return (
    <StyledFileDropzone>
      <div
        className={classNames('dropzone', { highlight })}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={openFileDialog}
        role="presentation"
      >
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          accept={acceptFile}
          onChange={handleChangeFile}
        />
        {(() => {
          if (file === null) {
            if (formatError || oversize) return <UploadError />;
            return <UploadNote />;
          }
          return <UploadSuccess />;
        })()}
      </div>
    </StyledFileDropzone>
  );
};

export default FileDropzone;
