import { useState, Fragment } from "react";
import { ObjectId } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { Loader2, Frown } from "lucide-react";
import useAccountCapys from "../utils/useAccountCapys";
import GameChooseHero from "./GameChooseHero";
import GamePlay from "./GamePlay";

const NoCapysInWallet = () => (
  <div className="h-full flex flex-col items-center justify-center text-center">
    There are no Capys in your wallet <Frown className="inline" />
    <br />
    Buy some at{" "}
    <a
      href="https://capy.art/"
      className="text-sui"
      target="_blank"
      rel="noreferrer"
    >
      <b>capy.art</b>
    </a>{" "}
    and come back to play. <br />
    We're running in {import.meta.env.VITE_SUI_DEPLOYMENT_NETWORK}, so make sure
    your wallet's network settings are properly set.
  </div>
);

const Game = () => {
  const { currentAccount: accountAddress } = useWalletKit();
  //FIXME add parameters to modify swr
  // TODO error handling
  const { capys, error, isLoading } = useAccountCapys(accountAddress);
  const [capyHero, setCapyHero] = useState<ObjectId>();

  return (
    <Fragment>
      {isLoading && (
        <div className="h-full flex items-center justify-center text-center">
          <Loader2 size={48} color="#6EBCF0" className="animate-spin" />
        </div>
      )}
      {capys &&
        (capys.length === 0 ? (
          <NoCapysInWallet />
        ) : capyHero === undefined ? (
          <GameChooseHero capys={capys} setCapyHero={setCapyHero} />
        ) : (
          <GamePlay
            capys={capys}
            capyHero={capyHero}
            setCapyHero={setCapyHero}
          />
        ))}
    </Fragment>
  );
};

export default Game;
