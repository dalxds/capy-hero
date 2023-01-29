/* 
/ in that page we'll add the routing logic
/ If not logged in -> login
/ If logged in -> game
/ Navbar, Main area, Footer
/ Main area will have tabs that will change based on Navbar
/ 
*/
import { ConnectButton } from "@mysten/wallet-kit";
import { useWalletKit } from "@mysten/wallet-kit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs";
import Game from "./app/Game";
import History from "./app/History";
import Leaderboards from "./app/Leaderboards";

const App = (): JSX.Element => {
  const {
    isConnected,
    currentAccount: accountAddress,
    disconnect,
  } = useWalletKit();

  return (
    <>
      {!isConnected ? (
        <div className="h-screen flex items-center justify-center">
          <ConnectButton color={"connected"} />
        </div>
      ) : (
        <main id="app-container" className="h-screen flex justify-center">
          <Tabs
            defaultValue="game"
            className="mx-4 flex flex-col justify-content-center max-sm:w-full md:w-7/12 lg:w-5/12 2xl:w-4/12 h-full"
          >
            <TabsList className="flex-none my-2">
              <TabsTrigger value="game">Game</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
            </TabsList>
            <TabsContent value="game" className="grow min-h-0">
              <Game accountAddress={accountAddress} />
            </TabsContent>
            <TabsContent value="history" className="grow min-h-0">
              <History />
            </TabsContent>
            <TabsContent value="leaderboards" className="grow min-h-0">
              <Leaderboards />
            </TabsContent>
            <footer
              id="footer"
              className="flex flex-col items-center my-2 p-6 rounded-md border border-slate-200 text-xs text-slate-500"
            >
              <div id="FooterCopyrights">
                coded by @dalxds •{" "}
                <a href="https://capy.art/" target="_blank" rel="noreferrer">
                  Sui Capys
                </a>{" "}
                by{" "}
                <a
                  href="https://mystenlabs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mysten Labs
                </a>{" "}
              </div>
              <div id="FooterConnectedAccountAddress">
                {`${accountAddress} • `}
                <span onClick={() => disconnect()} className="cursor-pointer">
                  disconnect
                </span>
              </div>
            </footer>
          </Tabs>
        </main>
      )}
    </>
  );
};

export default App;
