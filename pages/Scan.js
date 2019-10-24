import React, { useState, useEffect } from "react";
import moment from "moment";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SearchInput from "../components/SearchInput";
import Table from "../components/Table";

const Scan = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const strQuery = query.trim();
    if (!strQuery) {
      if (result || error) {
        setError(null);
        setResult(null);
      }
      return;
    }
    let unmounted = false;
    const effect = async () => {
      try {
        const result = await fetchSearch(strQuery);
        if (unmounted) return;
        setResult(result);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };
    effect();
    return () => {
      unmounted = true;
    };
  }, [query]);

  console.log(result);
  return (
    <Container>
      <BackLink to="/" />
      <h1>
        <FiSearch />
        <span>Scan my PCB</span>
      </h1>
      <SearchInput onQuery={setQuery} />
      <div style={{ marginTop: 40 }}>
        {error ? (
          <span style={{ color: "hsl(0, 20%, 60%)" }}>
            {`SFYL: ${JSON.stringify(error)}`}
          </span>
        ) : result ? (
          <Table
            items={[
              { key: "battery", type: "BATTERY" },
              { key: "display", type: "DISPLAY" },
              { key: "top_cover", type: "TOP COVER" },
              { key: "back_cover", type: "BACK COVER" },
              { key: "button_metal", type: "BUTTON METAL ID" }
            ]}
            cols={cols(result)}
            getKey={r => r.key}
          />
        ) : null}
      </div>
    </Container>
  );
};

const cols = result => [
  {
    key: "part",
    header: "Part",
    render: m => m.type
  },
  {
    key: "ref",
    header: "Ref",
    render: m => result[m.key].reference
  },
  {
    key: "batch",
    header: "Batch",
    render: m => result[m.key].batch_number
  },
  {
    key: "date",
    header: "Date",
    render: m => moment(result[m.key].production_date).format("YYYY-MM-DD")
  }
];

async function fetchSearch(text) {
  const res = await fetch(`${process.env.API_URL}/nanox/${text}`);
  const data = await res.json();
  if (!res.ok) {
    throw data.error;
  }
  return data;
}

const Container = styled.div`
  padding: 60px;

  h1 {
    font-size: 30px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    svg {
      opacity: 0.4;
    }
    > * + * {
      margin-left: 10px;
    }
  }
`;

const BackLink = styled(Link)`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: transparent;
  border-radius: 4px;
  transition: 100ms linear background;

  &:hover {
    background: hsl(0, 20%, 20%);
  }

  &:active {
    background: hsl(0, 20%, 30%);
  }
`;

export default Scan;
