import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";

export const MetamaskButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={openChainModal}
                    type="button"
                  >
                    <Wallet className="mr-2 h-5 w-5" />
                    Wrong Netowrk
                  </Button>
                );
              }
              return (
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={openAccountModal}
                  type="button"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  {account.displayName}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
