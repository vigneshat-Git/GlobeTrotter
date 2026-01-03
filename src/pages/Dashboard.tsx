import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, TrendingUp, Wallet, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TripCard from "@/components/trips/TripCard";
import DestinationCard from "@/components/destinations/DestinationCard";

import santoriniImg from "@/assets/destination-santorini.jpg";
import tokyoImg from "@/assets/destination-tokyo.jpg";
import baliImg from "@/assets/destination-bali.jpg";

// Demo data
const recentTrips = [
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
];

const popularDestinations = [
  {
    id: "1",
    name: "Santorini",
    country: "Greece",
    image: santoriniImg,
    costIndex: "high" as const,
    popularity: 95,
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    image: tokyoImg,
    costIndex: "medium" as const,
    popularity: 92,
  },
  {
    id: "3",
    name: "Bali",
    country: "Indonesia",
    image: baliImg,
    costIndex: "low" as const,
    popularity: 89,
  },
];

const statsData = [
  { label: "Total Trips", value: "12", icon: MapPin, color: "text-primary" },
  { label: "Countries Visited", value: "8", icon: TrendingUp, color: "text-secondary" },
  { label: "Total Budget", value: "$24,500", icon: Wallet, color: "text-accent" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, Explorer! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to plan your next adventure?
          </p>
        </motion.div>

        {/* Quick Actions & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          {/* Plan New Trip Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/trips/new">
              <Card variant="elevated" className="h-full bg-gradient-hero border-0 p-6 group">
                <div className="flex flex-col h-full justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-foreground mb-1">
                      Plan New Trip
                    </h3>
                    <p className="text-primary-foreground/80 text-sm">
                      Start planning your next adventure
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <Card variant="default" className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Trips */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Upcoming Trips</h2>
            <Link to="/trips">
              <Button variant="ghost" className="gap-2">
                View all
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentTrips.map((trip, index) => (
              <TripCard key={trip.id} trip={trip} index={index} />
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Popular Destinations</h2>
            <Link to="/explore">
              <Button variant="ghost" className="gap-2">
                Explore all
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
