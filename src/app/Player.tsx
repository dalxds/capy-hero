import { Fragment } from "react";
import { ObjectId } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { ScrollArea } from "../components/scroll-area";
import useAccountCapyHeroGames from "../utils/useAccountCapyHeroGames";
import { Button } from "../components/button";
import { Loader2, Frown } from "lucide-react";

const NoPastCapyHeroGames = () => (
  <div className="h-full flex flex-col items-center justify-center text-center">
    There are no <span className="text-sui">Capy Hero Game NFTs</span> in your
    wallet <Frown className="inline" />
    <br />
    Try playing a game and you'll get some.
    <br />
    We're running in {import.meta.env.VITE_SUI_DEPLOYMENT_NETWORK}, so make sure
    your wallet's Network settings are properly set.
  </div>
);

const Player = () => {
  const { currentAccount: accountAddress } = useWalletKit();
  //FIXME add parameters to modify swr
  // TODO error handling
  const { accountGames, error, isLoading } =
    useAccountCapyHeroGames(accountAddress);

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
              games
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
                        // onClick={() => setCapyHero(accountGame.id)}
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
