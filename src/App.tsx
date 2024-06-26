import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { AppQuery as AppQueryType } from "../data/__generated__/AppQuery.graphql";

const AppQuery = graphql`
  query AppQuery {
    profilesCollection {
      edges {
        cursor
        node {
          nodeId
          id
        }
      }
    }
  }
`;

function App() {
  const [count, setCount] = useState(0);

  const data = useLazyLoadQuery<AppQueryType>(AppQuery, {});

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {data.profilesCollection?.edges[0].node.nodeId}
      </p>
    </>
  );
}

export default App;
