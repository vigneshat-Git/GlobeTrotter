import { motion } from "framer-motion";
import { MapPin, TrendingUp, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  costIndex: "low" | "medium" | "high";
  popularity: number;
}

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

const costColors = {
  low: "text-green-500",
  medium: "text-amber-500",
  high: "text-red-500",
};

const DestinationCard = ({ destination, index = 0 }: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card variant="interactive" className="overflow-hidden group">
        <div className="relative h-40 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-overlay opacity-40" />
          
          {/* Add Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="glass" size="icon" className="h-8 w-8">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Location Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">{destination.country}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold text-foreground mb-2">
            {destination.name}
          </h3>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{destination.popularity}% popular</span>
            </div>
            <span className={`font-medium capitalize ${costColors[destination.costIndex]}`}>
              {destination.costIndex} cost
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DestinationCard;
