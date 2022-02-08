import React from "react";

function debounce(fn, delay) {
  let timer;
  const thisContext = this;
  const args = arguments;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(thisContext, args);
    }, delay);
  };
}

const DropDownListItem = (props) => {
  console.log(props, "proposhjhh ");
  const toggleChangeListItem = () => {
    const { listData, uniqueKey } = props;
    console.log(listData, uniqueKey, "all keys");
    props.toggleChangeListItem(listData[uniqueKey]);
  };
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      const { listData, uniqueKey } = props;
      props.toggleChangeListItem(listData[uniqueKey]);
    }
  };
  const debouncedToggleChangeListItem = () => {
    return debounce(toggleChangeListItem, 100);
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
  // handle click outside ~ to close the dropdown
  // componentWillMount() {
  document.addEventListener("mousedown", handleDocClick, false);
  // }
  // componentWillUnmount() {
  //   document.removeEventListener("mousedown", handleDocClick, false);
  // }
  const handleDocClick = (e) => {
    console.log("mouse down", wrapper);
    if (!wrapper.contains(e.target)) {
      setIsOpen(false);
    }
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
      <button
        className={`new-drop-down__button ${activeClass}`}
        onClick={toggleIsOpen}
      >
        <span>{labelContent}</span>
        {renderDropDownIcon()}
      </button>
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
      console.log(listData, uniqueKey, isChecked, "list data");
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
    <div className="new-drop-down" ref={(wrapper) => (wrapper = wrapper)}>
      {renderSelected()}
      {isOpen && (
        <div className="new-drop-down__list-wrapper">
          {renderDropDownList()}
        </div>
      )}
    </div>
  );
}
