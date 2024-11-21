"use client";

import { useState } from "react";
import PlantingForm from "./planting/PlantingForm";
import RegistrationForm from "./planting/RegistrationForm";
import PhotoUpload from "./planting/PhotoUpload";
import NFTMarketplace from "./marketplace/NFTMarketplace";
import { motion, AnimatePresence } from "framer-motion";

export type PlantingStep = "registration" | "planting" | "photo" | "marketplace";

export default function TreePlanting() {
  const [currentStep, setCurrentStep] = useState<PlantingStep>("registration");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    location: "",
  });
  const [plantingData, setPlantingData] = useState({
    treeType: "",
    location: "",
    message: "",
  });

  const handleRegistrationComplete = (data: typeof userData) => {
    setUserData(data);
    setCurrentStep("planting");
  };

  const handlePlantingComplete = (data: typeof plantingData) => {
    setPlantingData(data);
    setCurrentStep("photo");
  };

  const handlePhotoComplete = async () => {
    // Here you would typically mint the NFT
    console.log("Minting NFT with:", { userData, plantingData });
    setCurrentStep("marketplace");
  };

  return (
    <div id="planting-section" className="py-24 bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === "registration" && (
              <motion.div
                key="registration"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <RegistrationForm onComplete={handleRegistrationComplete} />
              </motion.div>
            )}
            {currentStep === "planting" && (
              <motion.div
                key="planting"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <PlantingForm onComplete={handlePlantingComplete} />
              </motion.div>
            )}
            {currentStep === "photo" && (
              <motion.div
                key="photo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <PhotoUpload onComplete={handlePhotoComplete} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {currentStep === "marketplace" && <NFTMarketplace />} */}
        <NFTMarketplace />
      </div>
    </div>
  );
}