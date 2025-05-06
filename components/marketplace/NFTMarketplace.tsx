"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TreePine, Heart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import HopeGreenAbi from "@/abi/HopeGreen.json";
import { useAccount } from "wagmi";
import metadata from "@/lib/metadata.json";
import { formatWallet } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogQrCode } from "../DialogQrCode";

export default function NFTMarketplace() {
  const [userNFTs, setUserNFTs] = useState<any[]>([]);
  const { address, isConnected } = useAccount();

  const hopeGreenAddress = "0x750ab3842345a32d258379543665b73A53304479";
  const rpc =
    "https://polygon-mainnet.core.chainstack.com/f974e108ae568d5a0454713b4ae483e7";

  const fetchUserNFTs = useCallback(async () => {
    try {
      const mainAddress = "0xc7E81911fb5ABBe995221c0B4B7238f4C9e10dE0";
      const provider = new ethers.JsonRpcProvider(rpc);
      const contract = new ethers.Contract(
        hopeGreenAddress,
        HopeGreenAbi,
        provider
      );

      const balance = await contract.balanceOf(mainAddress);

      for (let i = 0; i < balance; i++) {
        try {
          const token = await contract.tokenOfOwnerByIndex(mainAddress, i);
          const tokenId = Number(token);

          // Obter dados do NFT
          const nftData: any = metadata[tokenId];
          if (nftData) {
            nftData.owner = mainAddress;

            // Atualizar estado incrementalmente
            setUserNFTs((prevNFTs) => [...prevNFTs, nftData]);
          }
          console.log("Token ID fetched:", tokenId);
        } catch (error) {
          console.error("Error fetching token ID for index", i, ":", error);
        }
      }
    } catch (error) {
      console.error("Error fetching user NFTs:", error);
    }
  }, [isConnected]);

  useEffect(() => {
    fetchUserNFTs();
  }, [isConnected]);

  return (
    <div className="py-24 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-900 dark:text-green-100">
            TreeNFT Marketplace
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Discover and collect unique tree NFTs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userNFTs.map((nft, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-green-100 dark:border-green-900"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={nft.image}
                    alt={"image"}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600">
                    R$ 15,35
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
                    {nft.name}
                  </h3>
                  <Link
                    target="_blank"
                    href={`https://polygonscan.com/nft/${hopeGreenAddress}/${
                      index + 1
                    }`}
                  >
                    <TreePine className="h-5 w-5 text-green-600" />
                  </Link>
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>Location: {nft.address}</p>
                  <p>Tree Type: {nft.name}</p>
                  <p>Owner: {formatWallet(nft.owner as string)}</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between gap-4">
                <Link
                  target="_blank"
                  href={`https://buy.stripe.com/8wM3ewdDQ2gt2xG6oq?prefilled_custom_field_nmeroenomedonftadquirido=nft`}
                >
                  <Button className="w-40 bg-[#16A349]">Buy</Button>
                </Link>
                <DialogQrCode />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
