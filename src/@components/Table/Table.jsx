import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ccc;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    tbody td {
      text-align: center;
      padding: 20px 0px;
      border-bottom: 1px solid #ccc;
    }
    th {
      padding: 20px 0px;
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
    tr {
      :nth-child(2n) {
        background-color: white;
      }
    }
  }
  button {
    border: none;
    background-color: transparent;
    padding-right: 0px 5px;
  }
  .pagination {
    padding: 0.5rem;
  }
`;

const Tr = styled.tr`
  padding: 15px 0px;
`;

const Th = styled.th`
  text-align: center;
`;

const Td = styled.td`
  padding: 0px 26px 0px 26px;
  height: 79px;
  white-space: nowrap;
  word-wrap: break-word;
  text-align: ${({ align }) => (align === "right" ? align : "left")};
`;

function Table({ columns, data, checkbox, customEndCol }) {
  const [checkBox, setCheckBox] = React.useState(false || checkbox);
  const [rows, setRows] = React.useState(data);
  const [selectAllRows, setSelectAllRows] = React.useState(false);
  const [sortType, setSortType] = React.useState(1);

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const renderTableHeader = () => (
    <tr>
      {checkBox && (
        <th>
          <input
            type="checkbox"
            onClick={() => setSelectAllRows(!selectAllRows)}
          />
        </th>
      )}
      {columns.map(({ label, name }, index) => {
        return (
          <th
            key={index}
            onClick={() => {
              sortByColumn(name, sortType);
              setSortType(sortType === 1 ? 0 : 1);
            }}
          >
            {name}
          </th>
        );
      })}
    </tr>
  );

  const compare = (columnName, order) => {
    const moveSmaller = order ? 1 : -1;
    const moveLarger = order ? -1 : 1;
    return (a, b) => {
      if (a[columnName] < b[columnName]) {
        return moveSmaller;
      }
      if (a[columnName] > b[columnName]) {
        return moveLarger;
      }
      return 0;
    };
  };

  const prepareRow = (row, idx) => {
    const isCollapsed = null;
    const backgroundColor = "#ff319";
    const selectOption = true;
    return (
      <React.Fragment key={idx}>
        <Tr
          selected={row.selected}
          uncollapsed={isCollapsed === idx}
          backgroundColor={backgroundColor}
        >
          {selectOption && (
            <td
              style={{
                width: "48px",
                padding: "0px",
                textAlign: "center",
              }}
            >
              <input
                checked={row.selected}
                type="checkbox"
                onChange={() => {
                  selectRow(row.id);
                }}
              />
            </td>
          )}

          {row.cells.map((cell, idx) => (
            <Td key={idx} align={columns[idx].align}>
              {cell.render()}{" "}
            </Td>
          ))}
          {customEndCol && (
            <td
              style={{
                width: "48px",
                padding: "0px",
                textAlign: "center",
              }}
            >
              {customEndCol(row)}
            </td>
          )}
        </Tr>
      </React.Fragment>
    );
  };

  const sortByColumn = (columnName, order) => {
    const sortedRows = rows.sort(compare(columnName, order));
    setRows(sortedRows);
  };

  const getColumnsByName = (columns) => {
    const columnsByName = {};
    columns.forEach((column) => {
      const col = {
        label: column.label,
      };

      if (column.render) {
        col["render"] = column.render;
      }
      col["hidden"] = column.hidden;
      columnsByName[column.name] = col;
    });

    return columnsByName;
  };

  const columnsWithSorting = React.useMemo(
    () =>
      columns.map((column) => {
        return {
          ...column,
          label: column.label ? column.label : column.name,
          hidden: column.hidden ? column.hidden : false,
          sortable: column.sortable ? column.sortable : false,
          // sort: column.sort,
          // sorted: {
          //   on: sortCol === column.name,
          // },
        };
      }),
    [columns]
  );

  const makeRender = (value, render, row) => {
    return render ? () => render({ row, value }) : () => value;
  };
  const columnsByName = React.useMemo(
    () => getColumnsByName(columnsWithSorting),
    [columnsWithSorting]
  );

  const sortDataInOrder = (data, columns) => {
    return data.map((row) => {
      const newRow = {};
      columns.forEach((column) => {
        if (!(column.name in row)) {
          throw new Error(`Invalid row data, ${column.name} not found`);
        }
        newRow[column.name] = row[column.name];
      });
      return newRow;
    });
  };

  const renderTableData = () => {
    const sortedData = sortDataInOrder(rows, columnsWithSorting);
    const newData = sortedData.map((row, idx) => {
      return {
        id: idx,
        selected: false,
        hidden: false,
        original: row,
        cells: Object.entries(row)
          .map(([column, value]) => {
            return {
              // hidden: columnsByName[column].hidden,
              field: column,
              value: value,
              render: makeRender(value, columnsByName[column].render, row),
            };
          })
          .filter((cell) => !cell.hidden),
      };
    });
    return newData.map((row, index) => {
      return prepareRow(row, index);
    });
  };

  return (
    <>
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </>
  );
}

function TableWrapper({ columns, data, checkbox, customEndCol }) {
  const memoColumns = React.useMemo(() => columns, []);
  return (
    <Styles>
      <Table
        columns={memoColumns}
        data={data}
        checkbox={checkbox || false}
        customEndCol={customEndCol}
      />
    </Styles>
  );
}

export default TableWrapper;
