import styled from 'styled-components';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';

const StyledFileDropzone = styled.div`
  .dropzone {
    border: 3px dotted ${COLOR.light};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    cursor: pointer;
    padding: 12px;
    text-align: center;
  }

  .highlight {
    background-color: ${TRANSPARENT_COLOR.primary};
  }

  .file-input {
    display: none;
  }

  .upload-file-title {
    margin-bottom: 15px;
  }

  .upload-success {
    .image-action {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .image-info {
      margin-top: 5px;
    }
  }

  .upload-note {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 12px;
  }

  .done-button {
    margin: 10px 0;
  }

  .preview-image-upload {
    display: flex;
    justify-content: center;
  }
  .preview-image {
    max-width: 80%;
    height: auto;
  }
  .choose-other-file {
    cursor: pointer;
    margin-left: 5px;
    color: ${COLOR.blue};
  }

  .allow-format-file {
    margin-bottom: 10px;
  }
`;
export { StyledFileDropzone };
