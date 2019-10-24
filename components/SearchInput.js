import React from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";

const SearchInput = ({ onQuery }) => {
  const onChangeText = debounce(text => onQuery(text), 250);
  const onChange = e => onChangeText(e.target.value);
  return <StyledInput onChange={onChange} initialValue="" autoFocus />;
};

const StyledInput = styled.input`
  background: hsl(0, 0%, 10%);
  border: 2px solid hsl(0, 0%, 20%);
  padding: 1rem;
  width: 400px;
  color: inherit;
  font-size: 24px;
`;

export default SearchInput;
