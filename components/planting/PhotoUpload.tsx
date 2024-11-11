"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoUploadProps {
  onComplete: () => void;
}

export default function PhotoUpload({ onComplete }: PhotoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onComplete();
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-green-100 dark:border-green-900">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <Camera className="h-12 w-12 mx-auto text-green-600 dark:text-green-400" />
            <h2 className="mt-4 text-2xl font-bold text-green-900 dark:text-green-100">
              Upload Tree Photo
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Take or upload a photo of your tree's location
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 dark:hover:border-green-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              
              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      className="mx-auto max-h-64 rounded-lg"
                    />
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Click to change photo
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Drop your image here or click to upload
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!selectedFile || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Minting NFT...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Create Tree NFT
                </>
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}