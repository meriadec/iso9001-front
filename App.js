import React from "react";
import styled from "styled-components";

import useDataPolling from "./useDataPolling";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const data = useDataPolling();

  if (!data) {
    return <Centered>...</Centered>;
  }

  return (
    <div>
      <Dashboard data={data} />
    </div>
  );
};

const Centered = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
