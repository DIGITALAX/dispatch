import { gql } from "@apollo/client";
import { graphClient } from "@/lib/subgraph/client";

const COLLECTIONS = `
  query($owner: String!) {
    collectionMinteds(where: {owner: $owner}, orderDirection: desc) {
      uri
      acceptedTokens
      basePrices
      amount
      name
      collectionId
      soldTokens
      tokenIds
    }
  }
`;

const COLLECTIONS_ALL = `
query {
  collectionMinteds(orderDirection: desc) {
    uri
    acceptedTokens
    basePrices
    amount
    name
    collectionId
    soldTokens
    tokenIds
  }
}
`;

const getAllCollections = async (owner: any): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(COLLECTIONS),
    variables: {
      owner: owner,
    },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ timedOut: true });
    }, 20000); // 1 minute timeout
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);
  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};

export default getAllCollections;

export const getCollectionsDecryptAll = async (): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(COLLECTIONS_ALL),
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ timedOut: true });
    }, 20000); // 1 minute timeout
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);
  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};
