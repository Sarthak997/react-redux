import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TableWrapper from "@components/Table/Table";
import BasicModal from "@components/BasicModal/BasicModal";
import NewDropDown from "@components/Dropdown/Dropdown";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.default.primary};
  z-index: -1;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;

const AddMemberButton = styled.button`
  background-color: ${({ theme }) => theme.colors.default.primaryDark};
  color: ${({ theme }) => theme.colors.default.white};
  border-radius: 2rem;
  margin-left: 2rem;
  height: 3rem;
  cursor: pointer;
`;

const Hr = styled.hr`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.default.darkGray};
`;
const DeleteDiv = styled.div`
  cursor: pointer;
`;
const TeamMembers = ({ data, addNewPlayer, deletePlayer }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [uniqueKey, setUniqueKey] = useState("value");
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([
    {
      label: "One",
      value: 1,
    },
    {
      label: "Two",
      value: 2,
    },
    {
      label: "Three",
      value: 3,
    },
  ]);
  useEffect(() => {
    let filters = data.map((info, idx) => {
      return info.company;
    });
    setOptions(
      [...new Set(filters)].map((filter, idx) => {
        return { label: idx, value: filter };
      })
    );
    setSelected([...new Set(filters)]);
    getFilteredMembers(data);
  }, [data]);
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

  const toggleChangeListItem = (unique) => {
    if (unique === "ALL") {
      if (selected.length === options.length) {
        setSelected([]);
      } else {
        const allUniqueKeys = options.map((item) => item[uniqueKey]);
        setSelected(allUniqueKeys);
      }
    } else {
      let updatedSelected = [...selected];
      if (updatedSelected.indexOf(unique) > -1) {
        updatedSelected.splice(updatedSelected.indexOf(unique), 1);
      } else {
        updatedSelected.push(unique);
      }
      setSelected(updatedSelected);
    }
  };

  function handleAddMembers(name, status, company, notes) {
    let player = {
      name,
      status,
      company,
      notes,
      last_updated: new Date().toLocaleDateString(),
    };
    addNewPlayer(player);
  }

  function getFilteredMembers(members) {
    return members.filter(function (member) {
      return selected.indexOf(member.company) > -1;
    });
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
      <Header>
        <h1>Team Members</h1>
        <AddMemberButton onClick={() => setModalOpen(true)}>
          Add Members +
        </AddMemberButton>
      </Header>
      <Hr />
      <NewDropDown
        shouldHaveSelectAll={true}
        uniqueKey={uniqueKey}
        data={options}
        selected={selected}
        toggleChangeListItem={toggleChangeListItem}
      ></NewDropDown>
      <TableWrapper
        columns={columns}
        data={getFilteredMembers(data)}
        checkbox={true}
        customEndCol={(row) => {
          return (
            <DeleteDiv onClick={() => deletePlayer(row.original.uuid)}>
              <img src={require("@assets/delete.svg")} alt="" />
            </DeleteDiv>
          );
        }}
      />
      ;
    </>
  );
};

export default TeamMembers;
