import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Dashboard from "../pages/Dashboard";
import Scan from "../pages/Scan";

const DELAY = 10e3;

const App = () => {
  const data = useDataPolling();

  if (!data) {
    return <Centered>...</Centered>;
  }

  return (
    <Router>
      <Switch>
        <Route path="/scan">
          <Scan />
        </Route>
        <Route>
          <Dashboard data={data} />
        </Route>
      </Switch>
    </Router>
  );
};

const useDataPolling = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let unmount = false;
    const effect = async () => {
      const data = await fetchData();
      if (unmount) return;
      setData(data);
      await new Promise(r => setTimeout(r, DELAY));
      effect();
    };
    effect();
    return () => {
      unmount = true;
    };
  }, []);

  return data;
};

const fetchData = async () => {
  const res = await fetch(`${process.env.API_URL}/state`);
  const data = await res.json();
  return data;
};

const Centered = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
