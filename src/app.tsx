import { Fragment } from "react";
import { ConnectButton } from "@mysten/wallet-kit";
import { useWalletKit } from "@mysten/wallet-kit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import Game from "./app/Game";
import Player from "./app/Player";
import Leaderboard from "./app/Leaderboard";

const App = (): JSX.Element => {
  const { isConnected } = useWalletKit();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Fragment>
        {!isConnected ? (
          <div className="h-screen flex flex-col space-y-4 items-center justify-center">
            {/* TODO create logo variant */}
            <div id="Name" className="text-2xl text-sui font-bold">
              capy hero
            </div>
            <div
              id="Description"
              className="text-sm text-slate-500 text-center max-w-[12rem]	"
            >
              a simple clicking game to explore the sui blockchain
            </div>
            <ConnectButton color={"connected"} />
          </div>
        ) : (
          <main id="app-container" className="h-screen flex justify-center">
            <Tabs
              defaultValue="game"
              className="mx-4 flex flex-col justify-content-center max-sm:w-full md:w-7/12 lg:w-5/12 2xl:w-4/12 h-full"
            >
              <Logo />
              <TabsList className="flex-none my-2">
                <TabsTrigger value="game">Game</TabsTrigger>
                <TabsTrigger value="player">Player</TabsTrigger>
                <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
              </TabsList>
              <TabsContent value="game" className="grow min-h-0">
                <Game />
              </TabsContent>
              <TabsContent value="player" className="grow min-h-0">
                <Player />
              </TabsContent>
              <TabsContent value="leaderboards" className="grow min-h-0">
                <Leaderboard />
              </TabsContent>
              <Footer />
            </Tabs>
          </main>
        )}
      </Fragment>
    </ErrorBoundary>
  );
};

export default App;
