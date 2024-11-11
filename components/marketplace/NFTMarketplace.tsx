"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TreePine, Heart, Share2 } from "lucide-react";

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

const mockNFTs: NFT[] = [
  {
    id: "1",
    name: "Amazon Oak #1",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    location: "Amazon Rainforest",
    treeType: "Oak Tree",
    owner: "0x1234...5678",
    price: "0.05 ETH",
    likes: 24,
  },
  {
    id: "2",
    name: "Borneo Pine #3",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    location: "Borneo",
    treeType: "Pine Tree",
    owner: "0x8765...4321",
    price: "0.04 ETH",
    likes: 18,
  },
  {
    id: "3",
    name: "Madagascar Maple #7",
    image: "https://images.unsplash.com/photo-1501261379837-c3b516c6b3a1",
    location: "Madagascar",
    treeType: "Maple Tree",
    owner: "0x9876...5432",
    price: "0.06 ETH",
    likes: 31,
  },
];

export default function NFTMarketplace() {
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
          {mockNFTs.map((nft) => (
            <Card key={nft.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-green-100 dark:border-green-900">
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600">
                    {nft.price}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
                    {nft.name}
                  </h3>
                  <TreePine className="h-5 w-5 text-green-600" />
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>Location: {nft.location}</p>
                  <p>Tree Type: {nft.treeType}</p>
                  <p>Owner: {nft.owner}</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
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