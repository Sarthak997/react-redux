import React from "react";
import styled from "styled-components";
import TeamMembers from "@screens/TeamMembers";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.default.primary};
  z-index: -1;
  display: flex;
  flex-direction: column;
`;

export const AppShell = (props) => {
  return (
    <Wrapper>
      <TeamMembers />
    </Wrapper>
  );
};

export default AppShell;
