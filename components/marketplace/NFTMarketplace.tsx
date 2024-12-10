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
} from "@/components/ui/dialog"
import { DialogQrCode } from "../DialogQrCode";

export default function NFTMarketplace() {
  const [userNFTs, setUserNFTs] = useState<any[]>([]);
  const { address, isConnected } = useAccount();

  const hopeGreenAddress = "0xde9D88F2b0D24872f278Af1dbcE3EC4712e0Aea3";
  const rpc =
    "https://orbital-dry-bird.matic.quiknode.pro/a9cb4567d7f7e47a1189ffbd342cedf8944935c0/";

  const fetchUserNFTs = useCallback(async () => {
    try {
      const mainAddress = "0xB85e0740B2321512F95987fa20e7AC1dbdD1aC96";
      const provider = new ethers.JsonRpcProvider(rpc);
      const contract = new ethers.Contract(
        hopeGreenAddress,
        HopeGreenAbi,
        provider
      );

      const balance = await contract.balanceOf(mainAddress);
      const promises = [];

      for (let i = 0; i < Number(balance); i++) {
        promises.push(contract.tokenOfOwnerByIndex(mainAddress, i));
      }

      const tokenIds = await Promise.all(promises);
      const userNFTs = tokenIds.map((tokenId) => {
        let nftData: any = metadata[Number(tokenId)];
        nftData.owner = mainAddress;
        return nftData || null;
      });

      setUserNFTs(userNFTs.filter(Boolean));
    } catch (error) {
      console.error("Error fetching user NFTs:", error);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      fetchUserNFTs();
    } else {
      setUserNFTs([]);
    }
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
