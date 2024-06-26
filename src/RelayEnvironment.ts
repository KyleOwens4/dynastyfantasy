import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabase } from "./supabase";

const fetchQuery: FetchFunction = async (operation, variables) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(SUPABASE_ANON_KEY);
  console.log(SUPABASE_URL);
  const response = await fetch(`${SUPABASE_URL}/graphql/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session?.access_token ?? SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return await response.json();
};

const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
  getDataID: (node) => node.nodeId,
  missingFieldHandlers: [
    {
      handle(field, _record, argValues) {
        if (field.name === "node" && "nodeId" in argValues) {
          // If field is node(nodeId: $nodeId), look up the record by the value of $nodeId
          return argValues.nodeId;
        }

        return undefined;
      },
      kind: "linked",
    },
  ],
});

export default environment;
