import React from "react";
import styled from "styled-components";

const Table = ({ items, cols, getKey, style }) => {
  const hasHeader = !!cols[0] && !!cols[0].header;

  return (
    <TableContainer style={style}>
      {hasHeader && (
        <thead>
          <tr>
            {cols.map(col => (
              <Col key={col.key} style={{ fontWeight: "bold", color: "white" }}>
                {col.header}
              </Col>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {items.map(item => (
          <Row key={getKey(item)}>
            {cols.map(col => (
              <Col key={col.key}>{col.render(item)}</Col>
            ))}
          </Row>
        ))}
      </tbody>
    </TableContainer>
  );
};

const TableContainer = styled.table`
  width: 100%;
`;

const Row = styled.tr`
  &:nth-child(odd) {
    background: hsla(0, 0%, 100%, 0.02);
  }
`;
const Col = styled.td`
  padding: 0 10px;
  font-family: monospace;
`;

export default Table;
