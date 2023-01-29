import { useState, Fragment } from "react";
import { SuiAddress, ObjectId } from "@mysten/sui.js";
import { Loader2, Frown } from "lucide-react";
import useSWR from "swr";
import getAccountCapys from "../utils/getAccountCapys";
import GameChooseHero from "./GameChooseHero";
import GamePlay from "./GamePlay";

type GameProps = {
  accountAddress: SuiAddress | null;
};

// in that component we'll fetch the data

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
    and come back to play.
  </div>
);

const Game = ({ accountAddress }: GameProps) => {
  //FIXME add parameters to modify swr
  // TODO error handling
  const {
    data: capys,
    error,
    isLoading,
  } = useSWR(accountAddress, getAccountCapys, {});
  const [capyHero, setCapyHero] = useState<ObjectId>();

  return (
    <Fragment>
      {/* FIXME Loader is not in the center */}
      {isLoading && (
        <div className="h-full flex items-center justify-center text-center">
          {/* FIXME load color from tailwind */}
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
