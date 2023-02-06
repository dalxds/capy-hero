import { Fragment, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/alert-dialog";
import { ObjectId } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { Loader2, PartyPopper } from "lucide-react";

type GamePlayEndProps = {
  gameUUID: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clicksCount: number;
  initializeGame: () => void;
  capyHero: ObjectId;
  setCapyHero: React.Dispatch<React.SetStateAction<ObjectId | undefined>>;
};

const GamePlayEnd = ({
  gameUUID,
  open,
  setOpen,
  clicksCount,
  initializeGame,
  capyHero,
  setCapyHero,
}: GamePlayEndProps) => {
  const { currentAccount: playerAddress } = useWalletKit();
  const [isMinting, setIsMinting] = useState(true);
  const [gameNFTAddress, setGameNFTAddress] = useState(undefined);

  useEffect(() => {
    if (open) {
      // TODO change this to read app url from netlify build envs
      const mintNFTFunctionEndpoint = import.meta.env.DEV
        ? "http://localhost:8888/.netlify/functions/mintNFT"
        : `https://capy-hero.netlify.app/.netlify/functions/mintNFT`;
      fetch(mintNFTFunctionEndpoint, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerAddress: playerAddress,
          capyHeroAddress: "0x" + capyHero,
          score: clicksCount,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setGameNFTAddress(data.gameNFTAddress);
          setIsMinting(false);
        })
        // TODO change to error boundary
        .catch((error) => console.error(error));
    }
    return () => {
      setIsMinting(true);
      setGameNFTAddress(undefined);
    };
  }, [open, capyHero, clicksCount, playerAddress]);

  return (
    // FIXME check again -- did cleanup in useEffect and it works fine
    // by passing gameUUID it triggers the component to unmount when the game is reset
    // reference: https://github.com/reactjs/react-modal/issues/106#issuecomment-546658885
    // maybe there is a cleaner way
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger key={gameUUID} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="inline-flex">
              Congrats <PartyPopper className="ml-2" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            You clicked <span className="font-semibold">{clicksCount}</span>{" "}
            times.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {isMinting ? (
            <div className="flex flex-col items-center justify-center text-center">
              <div id="MintingMessage" className="text-sm text-slate-500 mb-4">
                Your{" "}
                <span className="font-semibold text-sui">
                  Capy Hero Game NFT
                </span>{" "}
                is minting.
              </div>
              <Loader2 size={48} color="#6EBCF0" className="animate-spin" />
            </div>
          ) : (
            <Fragment>
              <div
                id="MintSuccessMessage"
                className="text-center text-sm text-slate-500 mb-2"
              >
                Your{" "}
                <span className="font-semibold text-sui">
                  Capy Hero Game NFT
                </span>{" "}
                was minted at the address{" "}
                <a
                  href={`https://explorer.sui.io/object/${gameNFTAddress}?network=${import.meta.env.VITE_SUI_DEPLOYMENT_NETWORK.toLowerCase()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold pointer-cursor"
                >
                  {gameNFTAddress}
                </a>
              </div>
              <AlertDialogAction onClick={() => initializeGame()}>
                play again
              </AlertDialogAction>
              <AlertDialogCancel onClick={() => setCapyHero(undefined)}>
                choose different hero
              </AlertDialogCancel>
            </Fragment>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GamePlayEnd;
