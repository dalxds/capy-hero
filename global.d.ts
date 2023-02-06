export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_ADDRESS: string;
      ADMIN_ADDRESS_MNEMONIC: string;
      ADMIN_CAP_OBJ_ADDRESS: string;
      CAPY_HERO_PACKAGE_ADDRESS: string;
      CAPY_HERO_GAME_MODULE: string;
      CAPY_HERO_NEW_GAME_NFT_FUNCTION: string;
      CAPY_HERO_NEW_GAME_NFT_MOVE_CALL_GAS_BUDGET: string;
      VITE_CAPY_HERO_GAME_SECONDS: string;
      VITE_SUI_DEPLOYMENT_NETWORK: "DEVNET" | "LOCAL" | "TESTNET";
      CONTEXT: string;
      SITE_NAME: string;
    }
  }
}
