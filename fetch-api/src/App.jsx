import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        "https://api.github.com/users/nihilnasdasdasdia"
      );
      const data = await resp.json();
      setData(data);
    };

    fetchData().catch((err) => setError(err));
  }, [data]);
  return (
    <>
      {error && <h2>ERRR</h2>}
      {data && JSON.stringify(data)}
    </>
  );
}

export default App;
