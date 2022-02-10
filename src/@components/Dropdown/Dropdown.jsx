import React from "react";
import styled from "styled-components";
const DropdownButtonWrapper = styled.button`
  color: ${({ isOpen }) => (isOpen ? "#cccccc" : "inherit")};
  // position: relative;
  border: 1px solid #cccccc;
  border-radius: 3px;
  width: var(--width-list);
  font-size: 12px;
  height: 30px;
  text-align: left;
  padding-left: 5px;
  cursor: pointer;
  font-family: inherit;
`;

const Wrapper = styled.div`
  font-size: 12px;
  width: 135px;
  position: relative;
  z-index: 1;
`;

const ListWrapper = styled.div`
  border: 1px solid #cccccc;
  max-width: var(--width-list);
  width: 100%;
  background: white;
  position: absolute;
`;

const DropDownListItem = (props) => {
  const toggleChangeListItem = () => {
    const { listData, uniqueKey } = props;
    props.toggleChangeListItem(listData[uniqueKey]);
  };
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      const { listData, uniqueKey } = props;
      props.toggleChangeListItem(listData[uniqueKey]);
    }
  };

  const { listData, isChecked } = props;
  const id = `${listData.label}__${listData.value}`;
  return (
    <div
      tabIndex={0}
      className="drop-down__list-item"
      onClick={toggleChangeListItem}
      onKeyUp={onKeyUp}
    >
      <input
        tabIndex={-1}
        id={id}
        type="checkbox"
        checked={isChecked}
        value={listData.label}
      />
      <label htmlFor={id}>{listData.value}</label>
    </div>
  );
};

export default function NewDropDown(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const renderDropDownIcon = () => {
    if (props.customRenderDropDownIcon) {
      return props.customRenderDropDownIcon();
    } else {
      return <span className="drop-down-icon">▼</span>;
    }
  };
  const renderSelected = () => {
    const { selected, data, uniqueKey } = props;
    let labelContent = "";
    if (!selected.length) {
      labelContent = "None Selected";
    } else if (selected.length === data.length) {
      labelContent = "All Selected";
    } else if (selected.length === 1) {
      const selectedOne = data.find((item) => item[uniqueKey] === selected[0]);
      labelContent = selectedOne.value;
    } else {
      labelContent = `${selected.length} Selected`;
    }
    const activeClass = isOpen ? "new-drop-down--is-open" : "";
    return (
      <DropdownButtonWrapper
        className={`new-drop-down__button ${activeClass}`}
        isOpen={isOpen}
        onClick={toggleIsOpen}
      >
        <span>{labelContent}</span>
        {renderDropDownIcon()}
      </DropdownButtonWrapper>
    );
  };
  const renderDropDownList = () => {
    const {
      data,
      toggleChangeListItem,
      uniqueKey,
      selected,
      shouldHaveSelectAll,
    } = props;

    let data_ = [...data];

    if (shouldHaveSelectAll) {
      data_ = [{ label: "Select All", value: "ALL" }, ...data];
    }

    const getIsChecked = ({ listData, uniqueKey, selected }) => {
      let isChecked = false;
      if (listData[uniqueKey] === "ALL") {
        if (selected.length === data.length) {
          isChecked = true;
        } else {
          isChecked = false;
        }
      } else {
        isChecked = selected.indexOf(listData[uniqueKey]) > -1;
      }
      return isChecked;
    };

    return data_.map((listData, index) => {
      const isChecked = getIsChecked({ listData, uniqueKey, selected });

      return (
        <DropDownListItem
          key={index}
          toggleChangeListItem={toggleChangeListItem}
          listData={listData}
          uniqueKey={uniqueKey}
          isChecked={isChecked}
        />
      );
    });
  };
  return (
    <Wrapper className="new-drop-down" ref={(wrapper) => (wrapper = wrapper)}>
      {renderSelected()}
      {isOpen && (
        <ListWrapper className="new-drop-down__list-wrapper">
          {renderDropDownList()}
        </ListWrapper>
      )}
    </Wrapper>
  );
}
