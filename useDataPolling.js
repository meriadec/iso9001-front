import { useState, useEffect } from "react";

const DELAY = 10e3;

export default () => {
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
