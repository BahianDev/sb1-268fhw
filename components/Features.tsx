import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TreePine, Sprout, Globe2, Leaf } from "lucide-react";

const features = [
  {
    title: "Real Tree Planting",
    description: "Every NFT represents a real tree planted in verified locations worldwide",
    icon: TreePine,
  },
  {
    title: "Unique NFTs",
    description: "Each tree generates a unique digital collectible with growth tracking",
    icon: Sprout,
  },
  {
    title: "Environmental Impact",
    description: "Track your contribution to global reforestation efforts",
    icon: Globe2,
  },
  {
    title: "Community Rewards",
    description: "Earn rewards and badges for your environmental contributions",
    icon: Leaf,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-white/50 dark:bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">
            Why Choose Osten Green?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-100 dark:border-green-900">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-green-900 dark:text-green-100">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}