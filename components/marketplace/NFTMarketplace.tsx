"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TreePine, Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface NFT {
  id: string;
  name: string;
  image: string;
  location: string;
  treeType: string;
  owner: string;
  price: string;
  likes: number;
}

export default function NFTMarketplace() {
  const [metadata, setMetadata] = useState<any[]>([]);

  const fetchMetadata = async () => {
    const urls = Array.from(
      { length: 91 },
      (_, i) =>
        `https://osten-green-nfts.s3.us-east-2.amazonaws.com/metadata/${
          i + 1
        }.json`
    );

    try {
      const data = await Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch ${url}`);
          return await response.json();
        })
      );
      setMetadata(data);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

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
          {metadata.map((nft, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-green-100 dark:border-green-900"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={`https://osten-green-nfts.s3.us-east-2.amazonaws.com/images/${
                      index + 1
                    }.jpeg`}
                    alt={"image"}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600">
                    1 eth
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
                    {nft?.name}
                  </h3>
                  <Link
                  target="_blank"
                    href={`https://amoy.polygonscan.com/nft/0xaa90e8e32656cef28a3d20e7933929b39b0020ac/${
                      index + 1
                    }`}
                  >
                    <TreePine className="h-5 w-5 text-green-600" />
                  </Link>
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>Location: {nft.address}</p>
                  <p>Tree Type: {nft.name}</p>
                  <p>Owner: 0x2BA52Ae...1e2351D</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  {nft.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
