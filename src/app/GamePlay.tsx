import { useState } from "react";
import { ObjectId } from "@mysten/sui.js";
import { Button } from "../components/button";
import { CapyObject } from "../utils/getAccountCapys";
import { ArrowLeft, RotateCw } from "lucide-react";
import { useReward } from "react-rewards";
import { useTimer } from "use-timer";
import { Separator } from "../components/seperator";
import GamePlayEOFDialog from "./GamePlayEOFDialog";

type GamePlayProps = {
  capys: CapyObject[];
  capyHero: ObjectId;
  setCapyHero: React.Dispatch<React.SetStateAction<ObjectId | undefined>>;
};

type GameState = "INITIALIZED" | "PLAYING" | "ENDED";

const GamePlay = ({ capys, capyHero, setCapyHero }: GamePlayProps) => {
  // get the Capy Object for the selected Capy Hero
  const capyHeroObject = capys.find((capy) => capy.id === capyHero);
  if (capyHeroObject === undefined) {
    throw new TypeError("There should be a value for capyHeroObject");
  }
  // state to handle the clicks count
  const [clicksCount, setClicksCount] = useState(0);
  // state to handle the game state
  const [gameState, setGameState] = useState<GameState>("INITIALIZED");
  // state to handle End Of Game (EOF) dialog
  const [isEOFDialogOpen, setEOFDialogOpen] = useState(false);
  // emojis shower library init
  const { reward } = useReward(capyHero, "emoji", {
    angle: 180,
    spread: 360,
    startVelocity: 22,
    elementCount: 15,
    elementSize: 30,
    zIndex: -1,
    position: "fixed",
    emoji: ["💧"],
  });
  // timer library init
  const {
    time,
    start: startTimer,
    reset: resetTimer,
    status: timerStatus,
  } = useTimer({
    initialTime: 3,
    endTime: 0,
    interval: 1000,
    step: 1,
    timerType: "DECREMENTAL",
    onTimeOver: () => endGame(),
  });

  // function that handles the click event on the Capy Hero
  const handleCapyHeroClick = () => {
    // start the game by starting the timer
    if (timerStatus === "STOPPED") {
      startTimer();
      setGameState("PLAYING");
    }
    setClicksCount(clicksCount + 1);
    reward();
  };

  // function that initializes (resets) the game
  const initializeGame = () => {
    // reset counter
    setClicksCount(0);
    // reset timer
    resetTimer();
    // change game status to initialized
    setGameState("INITIALIZED");
  };

  // functions that handles End Of Game (EOF)
  // game reset happens inside the modal
  const endGame = () => {
    setGameState("ENDED");
    setEOFDialogOpen(true);
  };

  // const MESSAGE_START_GAME = 'click on the capy to start the game'

  return (
    <div id="GamePlay" className="p-6">
      <div id="ControlsContainer" className="flex space-x-2 ">
        {/* back to main menu */}
        <Button variant="outline" onClick={() => setCapyHero(undefined)}>
          <ArrowLeft size={14} className="" />
        </Button>
        <div
          id="GameInfo"
          className="grow flex rounded-md text-sm font-medium border border-slate-200"
        >
          {gameState === "INITIALIZED" ? (
            <div
              id="GameInfoInstructions"
              className="grow self-center justify-self-center text-xs text-center"
            >
              click on the capy as fast as you can.
              <br />
              the game starts with the first click.
            </div>
          ) : (
            <div id="GameInfoCounts" className="grow flex">
              <div
                id="GameInfoCountsClicks"
                className="grow flex items-center justify-center"
              >
                <div className="font-semibold mr-1">{clicksCount}</div>
                <div className="text-xs text-slate-500">clicks</div>
              </div>
              <Separator orientation="vertical" className="grow-0" />
              <div
                id="GameInfoCountsTime"
                className="grow flex items-center justify-center"
              >
                <div className="font-semibold mr-1">{time}</div>
                <div className="text-xs text-slate-500">seconds</div>
              </div>
            </div>
          )}
        </div>
        {/* reset button: resets the game without saving */}
        <Button variant="outline" onClick={() => initializeGame()}>
          <RotateCw size={14} className="" />
        </Button>
      </div>
      <div id="CapyHeroSpace" onClick={() => handleCapyHeroClick()}>
        <div dangerouslySetInnerHTML={{ __html: capyHeroObject.SVG }} />
        <span id={capyHero} className="absolute left-2/4 top-1/2" />
      </div>
      <GamePlayEOFDialog
        open={isEOFDialogOpen}
        setOpen={setEOFDialogOpen}
        clicksCount={clicksCount}
        initializeGame={initializeGame}
        setCapyHero={setCapyHero}
      />
    </div>
  );
};

export default GamePlay;
