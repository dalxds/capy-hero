import { Handler } from "@netlify/functions";
import {
  JsonRpcProvider,
  Network,
  Ed25519Keypair,
  RawSigner,
} from "@mysten/sui.js";

export const handler: Handler = async (event) => {
  // === CONSTANTS ===
  // parse enviromental variables
  const adminAddress = process.env.ADMIN_ADDRESS;
  const mnemonic = process.env.ADMIN_ADDRESS_MNEMONIC;
  const adminCapAddress = process.env.ADMIN_CAP_OBJ_ADDRESS;
  const capyHeroPackageAddress = process.env.CAPY_HERO_PACKAGE_ADDRESS;
  const capyHeroModuleName = process.env.CAPY_HERO_GAME_MODULE;
  const capyHeroFunctionName = process.env.CAPY_HERO_NEW_GAME_NFT_FUNCTION;
  const capyHeroMoveCallGasBudget = parseInt(
    process.env.CAPY_HERO_NEW_GAME_NFT_MOVE_CALL_GAS_BUDGET
  );
  const capyHeroGameSeconds = parseInt(process.env.VITE_CAPY_HERO_GAME_SECONDS);
  const deploymentContext = process.env.CONTEXT;
  const deploymentDomainName = process.env.SITE_NAME;
  // get the provider
  const provider = new JsonRpcProvider(Network.DEVNET);

  console.log(deploymentContext);
  console.log(deploymentDomainName);

  // set function response headers
  const responseHeaders = {
    "access-control-allow-methods": "POST,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Max-Age": "2592000",
    "Access-Control-Allow-Credentials": "true",
  };

  // === SECURE SERVERLESS FUNCTION
  // object that will be returned on error of security checks
  const responseUnauthorized = {
    statusCode: 401,
    body: JSON.stringify("Unauthorized"),
  };

  // handle OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: { ...responseHeaders },
    };
  }

  // check #1: allow only POST methods
  if (deploymentContext !== "dev" && event.httpMethod !== "POST") {
    return responseUnauthorized;
  }

  // check #2: request comes from the app
  // this can be spoofed easily but it's one more check
  if (
    deploymentContext !== "dev" &&
    !event.headers.referer?.includes(deploymentDomainName)
  ) {
    return responseUnauthorized;
  }

  // parse request body
  const requestBody = event.body ? JSON.parse(event.body) : {};
  // check #3: validate score range
  // world record is 14 clicks per second
  if (requestBody?.score < 0 || requestBody?.score > capyHeroGameSeconds * 15) {
    return {
      statusCode: 400,
      body: JSON.stringify("Invalid Score"),
    };
  }

  // TODO check #4: validate addresses

  // === HANDLE TXN
  // get admin sui coins balance to ensure that there is enough gas for the move call txn
  const { totalBalance: adminBalance } = await provider.getBalance(
    adminAddress
  );
  // if there isn't enough sui gas, request from faucet
  if (adminBalance <= capyHeroMoveCallGasBudget)
    await provider.requestSuiFromFaucet(adminAddress);

  // create game admin keypair from mnemonic
  const adminKeypair = Ed25519Keypair.deriveKeypair(mnemonic);
  // create signer object
  const signer = new RawSigner(adminKeypair, provider);

  // execute movecall
  const moveCallTxn = await signer.executeMoveCall({
    packageObjectId: capyHeroPackageAddress,
    module: capyHeroModuleName,
    function: capyHeroFunctionName,
    typeArguments: [],
    arguments: [
      adminCapAddress,
      requestBody?.playerAddress,
      requestBody?.capyHeroAddress,
      requestBody?.score.toString(),
    ],
    gasBudget: capyHeroMoveCallGasBudget,
  });

  const moveCallTxnStatus =
    moveCallTxn["EffectsCert"]["effects"]["effects"]["status"]["status"];

  if (moveCallTxnStatus === "failure") {
    return {
      statusCode: 502,
      headers: {
        ...responseHeaders,
      },
      body: JSON.stringify({
        error:
          moveCallTxn["EffectsCert"]["effects"]["effects"]["status"]?.["error"],
      }),
    };
  }

  // get New Object Event from Move Call response
  const moveCallTxnNewObjectEvent = moveCallTxn["EffectsCert"]["effects"][
    "effects"
  ]["events"].find((obj) => obj.hasOwnProperty("newObject"));
  const gameNFTAddress = moveCallTxnNewObjectEvent?.newObject?.objectId;

  return {
    statusCode: 200,
    headers: {
      ...responseHeaders,
    },
    body: JSON.stringify({
      gameNFTAddress: gameNFTAddress,
    }),
  };
};
