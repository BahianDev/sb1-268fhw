"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TreePine } from "lucide-react";

const treeTypes = [
  { id: "oak", name: "Oak Tree", price: "0.05" },
  { id: "maple", name: "Maple Tree", price: "0.06" },
  { id: "pine", name: "Pine Tree", price: "0.04" },
  { id: "birch", name: "Birch Tree", price: "0.05" },
];

const locations = [
  { id: "amazon", name: "Amazon Rainforest" },
  { id: "borneo", name: "Borneo" },
  { id: "california", name: "California" },
  { id: "madagascar", name: "Madagascar" },
];

interface PlantingFormProps {
  onComplete: (data: { treeType: string; location: string; message: string }) => void;
}

export default function PlantingForm({ onComplete }: PlantingFormProps) {
  const [formData, setFormData] = useState({
    treeType: "",
    location: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-green-100 dark:border-green-900">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <TreePine className="h-12 w-12 mx-auto text-green-600 dark:text-green-400" />
            <h2 className="mt-4 text-2xl font-bold text-green-900 dark:text-green-100">
              Choose Your Tree
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Select the type of tree and where you'd like to plant it
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="tree-type">Tree Type</Label>
              <Select
                value={formData.treeType}
                onValueChange={(value) => setFormData({ ...formData, treeType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tree type" />
                </SelectTrigger>
                <SelectContent>
                  {treeTypes.map((tree) => (
                    <SelectItem key={tree.id} value={tree.id}>
                      {tree.name} ({tree.price} ETH)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Planting Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Input
                id="message"
                placeholder="Add a message to your tree NFT"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!formData.treeType || !formData.location}
            >
              Continue to Photo Upload
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}