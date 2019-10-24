import React from "react";
import styled from "styled-components";

import Table from "../Table";

const Dashboard = ({ data }) => (
  <Container>
    <Row>
      <Cell title="pcb number" hue={200}>
        <Table
          items={data.latest_pcbs}
          cols={latestPcbsCols}
          getKey={pcb => pcb.PCB}
        />
      </Cell>
      <Cell title="past stock" hue={300}>
        <Table
          items={data.past_materials}
          cols={lastMaterialsCols}
          getKey={m => m.id}
        />
      </Cell>
    </Row>
    <Row>
      <Cell title="nano x number today" hue={120} centered>
        <div
          style={{
            fontWeight: "bold",
            fontSize: 72
          }}
        >
          {data.total_nanoX_today}
        </div>
      </Cell>
      <Cell title="current stock" hue={70}>
        <Table
          items={data.current_materials}
          cols={currentMaterialCols}
          getKey={item => item.id}
        />
      </Cell>
    </Row>
  </Container>
);

const currentMaterialCols = [
  {
    key: "part",
    header: "Part",
    render: m => m.type
  },
  {
    key: "ref",
    header: "Ref",
    render: m => m.reference
  },
  {
    key: "batch",
    header: "Batch",
    render: m => m.batch_number
  },
  {
    key: "stock",
    header: "Stock",
    render: m => m.amount
  }
];

const latestPcbsCols = [
  {
    key: "pcb",
    render: pcb => pcb.PCB
  }
];

const lastMaterialsCols = [
  {
    key: "type",
    header: "Part",
    render: m => m.type
  },
  {
    key: "ref",
    header: "Ref",
    render: m => m.reference
  },
  {
    key: "batch_number",
    header: "Batch",
    render: m => m.batch_number
  },
  {
    key: "amount",
    header: "Stock",
    render: m => m.amount
  },
  {
    key: "lost",
    header: "Lost",
    render: m => m.lost
  }
];

const Cell = ({ title, children, hue, centered }) => (
  <CellContainer>
    <CellTitle hue={hue}>{title}</CellTitle>
    <CellContent centered={centered}>{children}</CellContent>
  </CellContainer>
);

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Row = styled.div`
  flex: 1;
  display: flex;
`;

const CellContainer = styled.div`
  flex: 1;
  margin: 10px;
  background: hsl(0, 0%, 13%);
  border: 2px solid hsl(0, 0%, 12%);
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CellContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  ${p =>
    p.centered
      ? `
    display: flex;
    align-items: center;
    justify-content: center;
  `
      : `
      padding-top: 50px;
      `}
`;

const CellTitle = styled.div`
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  line-height: 1;
  padding: 10px;
  display: inline-block;
  background: hsl(0, 0%, 15%);
  border-bottom: 2px solid hsl(0, 0%, 12%);
  border-right: 2px solid hsl(0, 0%, 12%);
  z-index: 1;
  color: hsl(${p => p.hue}, 100%, 60%);
`;

export default Dashboard;
