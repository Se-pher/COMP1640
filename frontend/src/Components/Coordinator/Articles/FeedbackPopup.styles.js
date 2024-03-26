import styled from 'styled-components';

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const PopupTitle = styled.h3`
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const PopupContent = styled.div`
  margin-bottom: 20px;
`;

export const FeedbackTextarea = styled.textarea`
  width: 95%;
  height: 100px;
  padding: 10px;
  resize: none;
`;

export const PopupFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

export const SubmitButton = styled.button`
  background-color: rgb(246, 121, 62);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;