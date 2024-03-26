import React, { useState } from 'react';
import * as s from './FeedbackPopup.styles';

const FeedbackPopup = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback('');
    onClose();
  };

  return isOpen ? (
    <s.PopupOverlay>
      <s.PopupContainer>
        <s.PopupHeader>
          <s.PopupTitle>Feedback</s.PopupTitle>
          <s.CloseButton onClick={onClose}>&#10005;</s.CloseButton>
        </s.PopupHeader>
        <s.PopupContent>
          <s.FeedbackTextarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback..."
          />
        </s.PopupContent>
        <s.PopupFooter>
          <s.CancelButton onClick={onClose}>Cancel</s.CancelButton>
          <s.SubmitButton onClick={handleSubmit}>Accept</s.SubmitButton>
        </s.PopupFooter>
      </s.PopupContainer>
    </s.PopupOverlay>
  ) : null;
};

export default FeedbackPopup;