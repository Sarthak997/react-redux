import React, { useState } from "react";
import styled from "styled-components";

const ScreenWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  font-size: 15px;
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  opacity: 60%;
  background: ${({ theme }) => theme.colors.default.gray};
`;

const ButtonsWrapper = styled.div`
  left: 10px;
  bottom: 15px;
  display: flex;
  flex-direction: row;
`;

const SubmitBtn = styled.button`
  padding: 0 30px;
  margin: 10px;
  height: 35px;
  font-size: 11px;
  background-color: ${({ theme }) => theme.colors.default.alert};
  border: 1px solid ${({ theme }) => theme.colors.default.alert};

  :hover {
    background-color: ${({ theme }) => theme.colors.default.alertDark};
  }
`;

const CancelBtn = styled.button`
  padding: 0 30px;
  margin: 10px;
  height: 35px;
  font-size: 11px;
  background-color: ${({ theme }) => theme.colors.default.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.default.darkGray};

  :hover {
    background-color: ${({ theme }) => theme.colors.default.lightBlack};
  }
`;
const Wrapper = styled.form`
  position: fixed;
  top: 32%;
  left: 40%;
  transform: translate(-50%, -50%);
  // font-family: 'Apercu_Medium';
  font-size: 18px;
  //   min-height: 60vh;
  display: flex;
  max-height: 30vh;
  // overflow: auto;
  // width: 390px;
  padding: 30px;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.default.gray};
  z-index: 21;
`;

const Hr = styled.hr`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.default.lightGray};
`;

const MainHeading = styled.div`
  font-size: 18px;
  //   color: ${({ theme }) => theme.colors.default.primary};
`;

const BasicModal = (props) => {
  const { visibility, onCancel, onSubmit } = props;
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <ScreenWrapper isVisible={visibility}>
      <Background onClick={onCancel} />
      <Wrapper
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(name, status, company, notes);
          setName("");
          setStatus("");
          setCompany("");
          setNotes("");
          onCancel();
        }}
      >
        <MainHeading>Add Members</MainHeading>
        <Hr />
        <label>
          Name
          <input onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          status
          <input onChange={(e) => setStatus(e.target.value)} value={status} />
        </label>
        <label>
          Company
          <input onChange={(e) => setCompany(e.target.value)} value={company} />
        </label>
        <label>
          Notes
          <input onChange={(e) => setNotes(e.target.value)} value={notes} />
        </label>
        <div style={{ marginTop: "2em" }}>
          <ButtonsWrapper>
            <SubmitBtn>Yes, Delete </SubmitBtn>
            <CancelBtn type="button" noHover onClick={onCancel}>
              No, Don't delete
            </CancelBtn>
          </ButtonsWrapper>
        </div>
      </Wrapper>
    </ScreenWrapper>
  );
};

export default BasicModal;
