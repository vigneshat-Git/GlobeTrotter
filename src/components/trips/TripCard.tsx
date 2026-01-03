import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, DollarSign, MoreVertical, Edit, Trash2, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  destinations: number;
  budget: number;
  coverImage: string;
}

interface TripCardProps {
  trip: Trip;
  index?: number;
}

const TripCard = ({ trip, index = 0 }: TripCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/trips/${trip.id}`}>
        <Card variant="interactive" className="overflow-hidden group">
          {/* Cover Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={trip.coverImage}
              alt={trip.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-overlay opacity-60" />
            
            {/* Actions Menu */}
            <div className="absolute top-3 right-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                  <Button variant="glass" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Trip
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
              {trip.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {trip.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{trip.startDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>{trip.destinations} stops</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-accent" />
                <span>${trip.budget}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default TripCard;
