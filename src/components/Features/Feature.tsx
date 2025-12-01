import {
  DollarSign,
  Shield,
  Clock,
  MapPin,
  Star,
  TrendingDown,
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function Features() {
  const items = [
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      title: "Save Money",
      description:
        "Reduce travel costs by sharing rides with trusted drivers and passengers.",
      color: "green",
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Safe & Verified",
      description:
        "All drivers and passengers are verified for maximum trust and safety.",
      color: "blue",
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Time Efficient",
      description:
        "Get rides on-time with reliable scheduling and trip tracking.",
      color: "purple",
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      title: "Nationwide Coverage",
      description: "Available across all major districts and cities in Rwanda.",
      color: "red",
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "Highly Rated",
      description: "Thousands of top-rated drivers and passengers.",
      color: "yellow",
    },
    {
      icon: <TrendingDown className="w-6 h-6 text-green-600" />,
      title: "Eco-Friendly",
      description:
        "Reduce carbon emissions by sharing rides and reducing traffic congestion.",
      color: "green",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Why Choose RwaRide?
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
          Experience a smarter, cheaper, and more sustainable way to travel.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {items.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
