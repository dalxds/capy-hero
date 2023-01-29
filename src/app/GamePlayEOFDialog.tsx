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
import { PartyPopper } from "lucide-react";

type GamePlayEndDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clicksCount: number;
  initializeGame: () => void;
  setCapyHero: React.Dispatch<React.SetStateAction<ObjectId | undefined>>;
};

const GamePlayEOFDialog = ({
  open,
  setOpen,
  clicksCount,
  initializeGame,
  setCapyHero,
}: GamePlayEndDialogProps) => (
  <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogTrigger />
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
        <AlertDialogCancel onClick={() => setCapyHero(undefined)}>
          choose different hero
        </AlertDialogCancel>
        <AlertDialogAction onClick={() => initializeGame()}>
          play again
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default GamePlayEOFDialog;
