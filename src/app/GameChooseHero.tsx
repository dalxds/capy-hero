import { CapyObject } from "../utils/getAccountCapys";
import { ObjectId } from "@mysten/sui.js";
import { ScrollArea } from "../components/scroll-area";
import { Button } from "../components/button";

type GameChooseHeroProps = {
  capys: CapyObject[];
  setCapyHero: React.Dispatch<React.SetStateAction<ObjectId | undefined>>;
};

const GameChooseHero = ({ capys, setCapyHero }: GameChooseHeroProps) => {
  return (
    <div id="GameChooseHero" className="h-full py-6 flex flex-col">
      <h5 className="pb-2 px-6 text-base text-center font-semibold text-gray-900">
        choose your <span className="text-sui">capy hero</span> to start the
        game
      </h5>
      <ScrollArea className="grow">
        <ul className="space-y-2 mb-3 mx-6 mt-1">
          {capys.map((capy) => {
            return (
              <li key={capy.id} className="">
                <Button
                  variant="subtle"
                  size="lg"
                  className="w-full justify-start p-2"
                  onClick={() => setCapyHero(capy.id)}
                >
                  <span
                    className="w-8 m-1"
                    dangerouslySetInnerHTML={{ __html: capy.SVG }}
                  />
                  {capy.name}
                </Button>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default GameChooseHero;
