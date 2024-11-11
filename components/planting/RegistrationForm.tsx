"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCircle } from "lucide-react";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Japan",
  "Australia",
  "Brazil",
].map(country => ({ id: country.toLowerCase().replace(/\s+/g, '-'), name: country }));

interface RegistrationFormProps {
  onComplete: (data: { name: string; email: string; location: string }) => void;
}

export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
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
            <UserCircle className="h-12 w-12 mx-auto text-green-600 dark:text-green-400" />
            <h2 className="mt-4 text-2xl font-bold text-green-900 dark:text-green-100">
              Join TreeNFT
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Register to start your tree planting journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Your Location</Label>
              <Select 
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!formData.name || !formData.email || !formData.location}
            >
              Continue to Tree Selection
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}