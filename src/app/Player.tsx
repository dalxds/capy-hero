import { Fragment } from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { ScrollArea } from "../components/scroll-area";
import useAccountCapyHeroGames from "../utils/useAccountCapyHeroGames";
import { Button } from "../components/button";
import { Loader2, Frown } from "lucide-react";

const NoPastCapyHeroGames = () => (
  <div className="h-full flex flex-col text-slate-600 space-y-4 p-12 items-center justify-center text-center">
    <Frown className="" />
    <p>
      There are no{" "}
      <span className="text-sui font-semibold">Capy Hero Game NFTs</span> in
      your wallet!
    </p>
    <p>Play the game to get some!</p>
    <p>
      We're running in {import.meta.env.VITE_SUI_DEPLOYMENT_NETWORK}, so make
      sure your wallet's network settings are properly set.
    </p>
  </div>
);

const Player = () => {
  const { currentAccount: accountAddress } = useWalletKit();
  const { accountGames, error, isLoading } =
    useAccountCapyHeroGames(accountAddress);

  if (error) throw Error(error);

  return (
    <Fragment>
      {isLoading && (
        <div className="h-full flex items-center justify-center text-center">
          <Loader2 size={48} color="#6EBCF0" className="animate-spin" />
        </div>
      )}
      {accountGames &&
        (accountGames.length === 0 ? (
          <NoPastCapyHeroGames />
        ) : (
          <div id="PlayerContainer" className="h-full py-6 flex flex-col">
            <h5 className="pb-2 px-6 text-base font-semibold text-gray-900">
              hello, {accountAddress}
            </h5>
            <div className="pb-2 px-6 text-sm">
              you've played{" "}
              <span className="text-sui font-semibold">
                {accountGames.length}
              </span>{" "}
              {accountGames.length === 1 ? "game" : "games"}
            </div>
            <ScrollArea className="grow">
              <ul className="space-y-2 mb-3 mx-6 mt-1">
                {accountGames.map((accountGame) => {
                  return (
                    <li key={accountGame} className="">
                      <Button
                        variant="subtle"
                        size="lg"
                        className="w-full justify-start p-2"
                        onClick={() =>
                          window.open(
                            `https://explorer.sui.io/object/${accountGame}?network=${import.meta.env.VITE_SUI_DEPLOYMENT_NETWORK.toLowerCase()}`,
                            "_blank",
                            "noreferrer"
                          )
                        }
                      >
                        {accountGame}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          </div>
        ))}
    </Fragment>
  );
};

export default Player;
