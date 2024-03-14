import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  max-width: 800px;
  margin-left: 100px;
`;

const TitleHeader = styled.h2`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AcceptButton = styled(Button)`
  background-color: #4caf50;
  color: #fff;
`;

const RejectButton = styled(Button)`
  background-color: #f44336;
  color: #fff;
`;

const Term = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);
  const [read, setRead] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem('termsAccepted');
    if (isAccepted) {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    if (read) {
      setAccepted(true);
      localStorage.setItem('termsAccepted', true);
      onAccept();
    }
  };

  const handleReject = () => {
    setAccepted(false);
  };

  return (
    <PopupOverlay open={!accepted}>
      <PopupContent>
        <TitleHeader>Terms and Conditions for Student Contributors</TitleHeader>
        <Content>
          <span>
            By submitting your article(s) and associated media to our university student magazine, you agree to the following terms and conditions:
          </span>
          <p>
            Copyright: You confirm that you have the copyright permissions for all text, images, figures/diagrams and other media in your submitted documents. The author retains copyright of any published materials, but also grants the university student magazine the unlimited right to publish the content online and in print free of charge for non-commercial uses only.
          </p>
          <p>
            Editing: The university student magazine editorial team reserves the right to review all submissions and make editing changes prior to approval and publication to ensure quality standards, correct any factual inaccuracies or inconsistencies and improve clarity and presentation without altering the meaning.
          </p>
          <p>
            Attribution: By default, published articles will include the contributor's name and student ID. You may choose to contribute anonymously by contacting the magazine editor. However, your name and contact details stored internally will be disclosed if any issues arise regarding authenticity, copyright or ethical clearance related to your submission.
          </p>
          <p>
            Rejection: The university student magazine editorial team may reject submissions that do not meet the magazine guidelines, quality standards, or deemed unsuitable for the target student audience and magazine style and format. The decision of the editorial team is final.
          </p>
          <p>
            No Fees: You agree not to claim any fees or payments for submissions published in the university student magazine which is run by the university on a voluntary non-profit basis for the benefit of the student community. However, you will receive a sample print issue containing your published piece.
          </p>
        </Content>
        <CheckboxLabel>
          <Checkbox
            type="checkbox"
            checked={read}
            onChange={() => setRead(!read)}
          />
          I have read and understood the terms and conditions.
        </CheckboxLabel>
        <ButtonContainer>
          <RejectButton onClick={handleReject}>Reject</RejectButton>
          <AcceptButton onClick={handleAccept}>Accept</AcceptButton>
        </ButtonContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default Term;
