import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TableWrapper from "@components/Table/Table";
import BasicModal from "@components/BasicModal/BasicModal";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.default.primary};
  z-index: -1;
  display: flex;
  flex-direction: column;
`;

const TeamMembers = ({ data, addNewPlayer, deletePlayer }) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(data, "new here");
  let columns = [
    { name: "name", label: "Name" },
    { name: "company", label: "Company" },
    { name: "status", label: "Status", sortable: true },
    { name: "last_updated", label: "Last Updated" },
    { name: "notes", label: "Notes" },
    {
      name: "uuid",
      label: "uuid",
    },
  ];
  function handleAddMembers(name, status, company, notes) {
    let player = {
      name,
      status,
      company,
      notes,
      last_updated: new Date().toLocaleDateString(),
    };
    console.log(player, addNewPlayer);
    addNewPlayer(player);
  }

  return (
    <>
      <BasicModal
        visibility={modalOpen}
        onCancel={() => {
          setModalOpen(!modalOpen);
        }}
        onSubmit={handleAddMembers}
      />
      <h1>Team Members</h1>
      <button onClick={() => setModalOpen(true)}>Add Members</button>
      <TableWrapper
        columns={columns}
        data={data}
        checkbox={true}
        customEndCol={(row) => {
          return (
            <div onClick={() => deletePlayer(row.original.uuid)}>delete</div>
          );
        }}
      />
      ;
    </>
  );
};

export default TeamMembers;
