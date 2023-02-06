import { SuiObjectInfo, ObjectId, SuiAddress } from "@mysten/sui.js";
import useSWR from "swr";
import { useEffect, useState } from "react";
import getAccountObjects from "./getAccountObjects";

const getAccountCapyHeroGames = async (
  accountObjects: SuiObjectInfo[]
): Promise<ObjectId[]> => {
  try {
    // filter out the CapyHeroGames from all account objects and get their ids and then sort them
    const accountGameIds = accountObjects
      .filter((item) => item.type.includes("CapyHeroGame"))
      .sort((a, b) => b.version - a.version)
      .map((game) => game.objectId);

    // return if the account doesn't have any Capy Hero Games
    if (accountGameIds.length === 0) return [];

    return accountGameIds;
  } catch (error) {
    throw error;
  }
};

const useAccountCapyHeroGames = (accountAddress: SuiAddress | null) => {
  const { data, error } = useSWR(accountAddress, getAccountObjects);
  const [games, setGames] = useState<ObjectId[] | undefined>(undefined);
  const [capysError, setCapysError] = useState(false);

  useEffect(() => {
    if (data !== undefined) {
      getAccountCapyHeroGames(data as SuiObjectInfo[])
        .then((result) => {
          setGames(result);
        })
        .catch(() => setCapysError(true));
    }
  }, [data]);

  return {
    accountGames: games,
    error: error || capysError,
    isLoading: !error && !capysError && !games,
  };
};

export default useAccountCapyHeroGames;
