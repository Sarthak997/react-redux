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
  // overflow: hidden;
  // text-overflow: ellipsis;
  // text-align: left;
  text-align: ${({ align }) => (align === "right" ? align : "left")};
`;

function Table({ columns, data, checkbox, customEndCol }) {
  console.log(data, "in deep data");
  const [checkBox, setCheckBox] = React.useState(false || checkbox);
  const [rows, setRows] = React.useState(data);
  const [pageCount, setPageCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectAllRows, setSelectAllRows] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [sortType, setSortType] = React.useState(1);
  const [currentPageRows, setCurrentPageRows] = React.useState(
    data.slice(0, 10)
  );

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const gotoPage = (pageNo) => {
    setCurrentPage(Number(pageNo));
  };
  const previousPage = () => {
    currentPage > 1 ? setCurrentPage(currentPage - 1) : null;
  };
  const nextPage = () => {
    currentPage < pageCount ? setCurrentPage(currentPage + 1) : null;
  };

  // React.useEffect(() => {
  //   calculateTotalPages();
  // }, [rowsPerPage]);

  const calculateTotalPages = () => {
    const noPages = Math.ceil(rows.length / rowsPerPage);
    setPageCount(noPages);
    setCurrentPageRows(
      rows.slice(
        currentPage === 1 ? 0 : currentPage * rowsPerPage,
        currentPage === 1 ? rowsPerPage : currentPage * rowsPerPage
      )
    );
  };

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
              sortByColumn(label, sortType);
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
    const collapsible = row.cells.filter(
      (cell) => cell.field === "CollapsibleComponent"
    );
    // console.log("hererer", customEndCol(row));
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

          {/* {collapsible.length > 0 && (
            <td
              style={{
                width: "48px",
                padding: "0px 0px 0px 10px",
                textAlign: "center",
              }}
            >
              <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                              if (collapsibleStatus) {
                                if (isCollapsed === null) collapsibleStatus(true);
                                else collapsibleStatus(false);
                              }

                              setIsCollapsed(
                                isCollapsed === null ? idx : isCollapsed === idx ? null : idx
                              );
                            }}
                          >
                            {isCollapsed === idx ? (
                              ">"
                            ) : (
                              "<"
                            )}
                          </IconButton>
            </td>
          )} */}

          {row.cells
            .filter((cell) => cell.field !== "CollapsibleComponent")
            .map((cell, idx) => (
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

        {isCollapsed === idx && collapsible.length > 0 && (
          <CollapsibleTR
            className="collapsibleComponent"
            key={idx}
            uncollapsed={isCollapsed === idx}
          >
            <CollapsibleTD colSpan={columns.length + 1}>
              {collapsible[0].render()}
            </CollapsibleTD>
          </CollapsibleTR>
        )}
      </React.Fragment>
      // <tr key={index}>
      //   {checkBox && (
      //     <th>
      //       <input
      //         defaultChecked={!!selectAllRows}
      //         type="checkbox"
      //         onChange={() => {
      //           const res = [...selectedRows, row];
      //           setSelectedRows(res);
      //         }}
      //       />
      //     </th>
      //   )}

      //   {columns.map((col, index) => {
      //     console.log(row[col.label], "inside table");
      //     return (
      //       <td key={index}>
      //         {col.render
      //           ? col.render({ value: row[col.label] })
      //           : row[col.label]}
      //       </td>
      //     );
      //   })}
      // </tr>
    );
  };

  const sortByColumn = (columnName, order) => {
    const sortedRows = rows
      .sort(compare(columnName, order))
      .slice(
        currentPage === 1 ? 0 : currentPage * rowsPerPage,
        currentPage === 1 ? rowsPerPage : currentPage * rowsPerPage
      );

    setCurrentPageRows(sortedRows);
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
      console.log(newRow, "newRoe");
      return newRow;
    });
  };

  const renderTableData = () => {
    console.log(columnsByName, columnsWithSorting, "state in table");
    const sortedData = sortDataInOrder(rows, columnsWithSorting);
    const newData = sortedData.map((row, idx) => {
      return {
        id: idx,
        selected: false,
        hidden: false,
        original: row,
        cells: Object.entries(row)
          .map(([column, value]) => {
            console.log(columnsByName[column], column, "coulumns");
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
    console.log(newData, "new data");
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
      <div className="pagination">
        <button onClick={() => gotoPage(1)} disabled={!(currentPage < 1)}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!(currentPage < 1)}>
          {"<"}
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!(currentPage >= pageCount)}
        >
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageCount)}
          disabled={!(currentPage >= pageCount)}
        >
          {">>"}
        </button>
        <span>
          Page
          <strong>
            {currentPage} of {pageCount}
          </strong>
        </span>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function TableWrapper({ columns, data, checkbox, customEndCol }) {
  const memoColumns = React.useMemo(() => columns, []);
  console.log(data, "in table");
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
