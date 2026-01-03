import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, Star, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

interface PinnedLocation {
  id: string;
  lat: number;
  lng: number;
  author: string;
  avatar: string;
  locationName: string;
  description: string;
  rating: number;
  reviews: number;
  likes: number;
  category: string;
}

const pinnedLocations: PinnedLocation[] = [
  {
    id: "1",
    lat: 36.3932,
    lng: 25.4615,
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    locationName: "Oia Sunset Point",
    description: "The most iconic sunset spot in Santorini with breathtaking views",
    rating: 4.9,
    reviews: 1240,
    likes: 856,
    category: "Scenic View",
  },
  {
    id: "2",
    lat: 35.6762,
    lng: 139.6503,
    author: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    locationName: "Senso-ji Temple",
    description: "Historic Buddhist temple with traditional architecture",
    rating: 4.7,
    reviews: 3421,
    likes: 1203,
    category: "Temple",
  },
  {
    id: "3",
    lat: -8.7545,
    lng: 115.2718,
    author: "Emma Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    locationName: "Tegallalang Rice Terraces",
    description: "Stunning emerald green rice fields with traditional irrigation",
    rating: 4.8,
    reviews: 2156,
    likes: 945,
    category: "Nature",
  },
  {
    id: "4",
    lat: 48.8584,
    lng: 2.2945,
    author: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    locationName: "Eiffel Tower",
    description: "Iconic iron lattice tower offering panoramic city views",
    rating: 4.6,
    reviews: 8932,
    likes: 3421,
    category: "Landmark",
  },
  {
    id: "5",
    lat: 41.3874,
    lng: 2.1686,
    author: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    locationName: "Sagrada Familia",
    description: "Stunning basilica with unique Catalan Modernist architecture",
    rating: 4.8,
    reviews: 5234,
    likes: 2156,
    category: "Architecture",
  },
  {
    id: "6",
    lat: 27.1751,
    lng: 78.0421,
    author: "David Martinez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    locationName: "Taj Mahal",
    description: "Magnificent white marble mausoleum of timeless beauty",
    rating: 4.9,
    reviews: 7621,
    likes: 4032,
    category: "Monument",
  },
  {
    id: "7",
    lat: -22.9068,
    lng: -43.1729,
    author: "Jessica Lee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    locationName: "Christ the Redeemer",
    description: "Iconic Art Deco statue overlooking Rio de Janeiro",
    rating: 4.7,
    reviews: 6543,
    likes: 3212,
    category: "Landmark",
  },
  {
    id: "8",
    lat: 51.5074,
    lng: -0.1278,
    author: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    locationName: "Big Ben & Parliament",
    description: "Historic gothic revival buildings in the heart of London",
    rating: 4.6,
    reviews: 4521,
    likes: 1987,
    category: "Architecture",
  },
];

// Simple map representation with pins
const MapVisualization = ({ locations }: { locations: PinnedLocation[] }) => {
  const minLat = Math.min(...locations.map((l) => l.lat));
  const maxLat = Math.max(...locations.map((l) => l.lat));
  const minLng = Math.min(...locations.map((l) => l.lng));
  const maxLng = Math.max(...locations.map((l) => l.lng));

  const normalize = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-border overflow-hidden">
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#999" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Map label */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 px-3 py-1 rounded-lg shadow-sm">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium text-foreground">World Map</span>
      </div>

      {/* Pins */}
      {locations.map((location) => (
        <div
          key={location.id}
          className="absolute transform -translate-x-1/2 -translate-y-full group"
          style={{
            left: `${normalize(location.lng, minLng, maxLng)}%`,
            top: `${normalize(location.lat, minLat, maxLat)}%`,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: Math.random() * 0.5 }}
            className="relative"
          >
            <div className="w-3 h-3 bg-destructive rounded-full shadow-lg group-hover:scale-150 transition-transform cursor-pointer" />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-xs font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {location.locationName}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const Maps = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<PinnedLocation | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Scenic View",
    "Temple",
    "Nature",
    "Landmark",
    "Architecture",
    "Monument",
  ];

  const filteredLocations = pinnedLocations.filter((location) => {
    const matchesSearch = location.locationName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Travel Map</h1>
              <p className="text-muted-foreground">
                Discover locations pinned by travelers worldwide
              </p>
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-4">
            <MapVisualization locations={filteredLocations} />
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Locations List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedLocation(location)}
                  >
                    {/* Location Header */}
                    <div className="p-4 border-b border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-lg mb-1">
                            {location.locationName}
                          </h3>
                          <p className="text-xs text-primary bg-primary/10 inline-block px-2 py-1 rounded">
                            {location.category}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {location.description}
                      </p>
                    </div>

                    {/* User Info */}
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <img
                          src={location.avatar}
                          alt={location.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {location.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Pinned this location
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Rating & Stats */}
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(location.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {location.rating}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({location.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors flex-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{location.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors flex-1">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <p className="text-muted-foreground text-lg">
                  No locations found matching your search.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Selected Location Modal - Simple card view */}
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedLocation(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-xl max-w-md w-full p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {selectedLocation.locationName}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedLocation.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {selectedLocation.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({selectedLocation.reviews} reviews)
                </span>
              </div>
              <p className="text-foreground mb-4">{selectedLocation.description}</p>
              <div className="flex items-center gap-3 mb-4 p-3 bg-muted rounded-lg">
                <img
                  src={selectedLocation.avatar}
                  alt={selectedLocation.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {selectedLocation.author}
                  </p>
                  <p className="text-xs text-muted-foreground">Pinned this location</p>
                </div>
              </div>
              <Button
                onClick={() => setSelectedLocation(null)}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Maps;
