import {
  JsonRpcProvider,
  Network,
  SuiAddress,
  SuiObjectInfo,
} from "@mysten/sui.js";

const getAccountObjects = async (
  accountAddress: SuiAddress
): Promise<SuiObjectInfo[]> => {
  const provider = new JsonRpcProvider(Network.DEVNET);
  try {
    // get all account objects
    const accountObjects = await provider.getObjectsOwnedByAddress(
      accountAddress
    );
    return accountObjects;
  } catch (error) {
    throw error;
  }
};

export default getAccountObjects;
