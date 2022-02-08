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
      console.log(info.company, "heerererere");
      return info.company;
    });
    console.log([...new Set(filters)]);
    setOptions(
      [...new Set(filters)].map((filter, idx) => {
        return { label: idx, value: filter };
      })
    );
    setSelected([...new Set(filters)]);
    getFilteredMembers(data);
  }, [data]);
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

  const renderSelected = () => {
    const options_ = options.slice();
    let res = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < options_.length; j++) {
        if (options_[j][uniqueKey] === selected[i]) {
          res.push(options_[j]);
          options_.splice(j, 1);
        }
      }
    }
    return JSON.stringify(res);
  };

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

  function getFilteredMembers(members) {
    console.log(members, selected, "sab yahan");
    // if (selected.length) {
    return members.filter(function (member) {
      return selected.indexOf(member.company) > -1;
    });
    // } else {
    //   return members;
    // }
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
      <NewDropDown
        shouldHaveSelectAll={true}
        uniqueKey={uniqueKey}
        data={options}
        selected={selected}
        toggleChangeListItem={toggleChangeListItem}
      ></NewDropDown>
      <div>
        <h5>Selected:</h5>
        {renderSelected()}
      </div>
      <button onClick={() => setModalOpen(true)}>Add Members</button>
      <TableWrapper
        columns={columns}
        data={getFilteredMembers(data)}
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
