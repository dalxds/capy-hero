import { useWalletKit } from "@mysten/wallet-kit";

const Footer = () => {
  const { currentAccount: accountAddress, disconnect } = useWalletKit();
  return (
    <footer
      id="footer"
      className="flex flex-col items-center my-2 p-6 rounded-md border border-slate-200 text-xs text-slate-500"
    >
      <div id="FooterCopyrights">
        coded by{" "}
        <a
          href="https://github.com/dalxds/capy-hero"
          target="_blank"
          rel="noreferrer"
        >
          @dalxds
        </a>{" "}
        •{" "}
        <a href="https://capy.art/" target="_blank" rel="noreferrer">
          Sui Capys
        </a>{" "}
        by{" "}
        <a href="https://mystenlabs.com/" target="_blank" rel="noreferrer">
          Mysten Labs
        </a>{" "}
      </div>
      <div id="FooterConnectedAccountAddress">
        {`${import.meta.env.VITE_SUI_DEPLOYMENT_NETWORK.toLowerCase()} • `}
        {`${accountAddress} • `}
        <span onClick={() => disconnect()} className="cursor-pointer">
          disconnect
        </span>
      </div>
    </footer>
  );
};

export default Footer;
