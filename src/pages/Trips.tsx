import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TripCard from "@/components/trips/TripCard";

import santoriniImg from "@/assets/destination-santorini.jpg";
import tokyoImg from "@/assets/destination-tokyo.jpg";
import baliImg from "@/assets/destination-bali.jpg";

const allTrips = [
  {
    id: "1",
    name: "Greek Island Hopping",
    description: "Explore the stunning Cyclades islands - Santorini, Mykonos, and Naxos",
    startDate: "Mar 15, 2026",
    endDate: "Mar 28, 2026",
    destinations: 3,
    budget: 4500,
    coverImage: santoriniImg,
  },
  {
    id: "2",
    name: "Japan Cherry Blossoms",
    description: "Experience the magical hanami season across Tokyo, Kyoto, and Osaka",
    startDate: "Apr 1, 2026",
    endDate: "Apr 14, 2026",
    destinations: 4,
    budget: 6200,
    coverImage: tokyoImg,
  },
  {
    id: "3",
    name: "Bali Wellness Retreat",
    description: "Relax and rejuvenate with yoga, spa, and beautiful rice terraces",
    startDate: "May 10, 2026",
    endDate: "May 20, 2026",
    destinations: 2,
    budget: 3200,
    coverImage: baliImg,
  },
];

const Trips = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTrips = allTrips.filter((trip) =>
    trip.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Trips</h1>
            <p className="text-muted-foreground mt-1">
              Manage and view all your travel plans
            </p>
          </div>
          <Link to="/trips/new">
            <Button variant="hero" size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Create New Trip
            </Button>
          </Link>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <div className="flex rounded-xl border border-input overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trips Grid */}
        {filteredTrips.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredTrips.map((trip, index) => (
              <TripCard key={trip.id} trip={trip} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg mb-4">
              No trips found matching your search.
            </p>
            <Link to="/trips/new">
              <Button variant="hero">Create your first trip</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Trips;
