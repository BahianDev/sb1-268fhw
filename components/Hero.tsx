"use client";

import { Button } from "@/components/ui/button";
import { Leaf, TreePine } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Hero() {
  const router = useRouter();

  const scrollToPlanting = () => {
    const plantingSection = document.getElementById("planting-section");
    if (plantingSection) {
      plantingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b')] bg-cover bg-center opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-green-900 dark:text-green-100 mb-6">
            Plant a Tree,{" "}
            <span className="text-green-600 dark:text-green-400">
              Mint an NFT
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join the green revolution by planting real trees and receiving
            unique NFTs. Each tree you plant helps combat climate change and
            becomes a digital collectible.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={scrollToPlanting}
            >
              <Leaf className="mr-2 h-5 w-5" />
              Start Planting
            </Button>
            <Button size="lg" variant="outline">
              <TreePine className="mr-2 h-5 w-5" />
              View Gallery
            </Button>
          </div>
        </motion.div>
      </div>
      <Image
        src="/logo-osten-green.png"
        width={150}
        height={50}
        className="absolute right-0 bottom-0"
        alt="logo"
      />
    </div>
  );
}
