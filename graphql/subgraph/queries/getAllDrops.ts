import { FetchResult, gql } from "@apollo/client";
import { graphClient } from "@/lib/subgraph/client";

const DROPS = `
  query($creator: String!) {
    dropCreateds(orderDirection: desc, where: {creator: $creator}) {
      dropId
      dropURI
      creator
      collectionIds
    }
  }
`;

const getAllDrops = async (creator: any): Promise<FetchResult<any>> => {
  return graphClient.query({
    query: gql(DROPS),
    variables: {
      creator: creator,
    },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });
};

export default getAllDrops;
