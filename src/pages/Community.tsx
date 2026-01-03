import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

import santoriniImg from "@/assets/destination-santorini.jpg";
import tokyoImg from "@/assets/destination-tokyo.jpg";
import baliImg from "@/assets/destination-bali.jpg";

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  tripName: string;
  description: string;
  image: string;
  destination: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
}

const communityPosts: CommunityPost[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    tripName: "Greek Island Adventure",
    description: "Just arrived in Santorini! The sunset views are absolutely breathtaking. Can't wait to explore Mykonos next! 🌅✨",
    image: santoriniImg,
    destination: "Santorini, Greece",
    likes: 342,
    comments: 28,
    timestamp: "2 hours ago",
    isLiked: false,
  },
  {
    id: "2",
    author: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    tripName: "Cherry Blossoms in Tokyo",
    description: "Walking through the streets of Shibuya during cherry blossom season is pure magic. Every corner has a photo opportunity! 📸🌸",
    image: tokyoImg,
    destination: "Tokyo, Japan",
    likes: 567,
    comments: 45,
    timestamp: "5 hours ago",
    isLiked: false,
  },
  {
    id: "3",
    author: "Emma Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    tripName: "Bali Wellness Retreat",
    description: "Found this hidden gem of a temple in Bali. The peaceful vibes and ancient architecture are incredible. Definitely coming back here! 🙏",
    image: baliImg,
    destination: "Bali, Indonesia",
    likes: 428,
    comments: 52,
    timestamp: "8 hours ago",
    isLiked: false,
  },
  {
    id: "4",
    author: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    tripName: "Mediterranean Cruise",
    description: "Exploring the beautiful coastlines of the Mediterranean. Each port has its own charm and unique culture. 🚢⛵",
    image: santoriniImg,
    destination: "Mediterranean Sea",
    likes: 289,
    comments: 31,
    timestamp: "12 hours ago",
    isLiked: false,
  },
  {
    id: "5",
    author: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    tripName: "Southeast Asia Explorer",
    description: "From temples to beaches, Southeast Asia has everything! This trip has been the most rewarding experience of my life. 🌍❤️",
    image: baliImg,
    destination: "Southeast Asia",
    likes: 612,
    comments: 67,
    timestamp: "1 day ago",
    isLiked: false,
  },
  {
    id: "6",
    author: "David Martinez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    tripName: "European Wine Tour",
    description: "Tasting the finest wines across Europe's vineyards. The food and wine culture here is absolutely world-class! 🍷🍇",
    image: tokyoImg,
    destination: "France, Italy, Spain",
    likes: 398,
    comments: 44,
    timestamp: "1 day ago",
    isLiked: false,
  },
];

const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.tripName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Travel Community</h1>
              <p className="text-muted-foreground">
                Explore trips and experiences shared by travelers worldwide
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search trips, destinations, or travelers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </motion.div>

        {/* Community Feed */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between border-b border-border">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {post.author}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {post.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-foreground mb-2">
                      {post.tripName}
                    </h2>
                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary">
                        📍 {post.destination}
                      </span>
                    </div>
                    <p className="text-foreground mb-4 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  {/* Post Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.tripName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Post Actions */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-2 hover:text-primary transition-colors group"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            post.isLiked
                              ? "fill-destructive text-destructive"
                              : "text-muted-foreground group-hover:text-destructive"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            post.isLiked ? "text-destructive font-semibold" : ""
                          }`}
                        >
                          {post.likes}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Share2 className="w-5 h-5" />
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
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                No posts found matching your search.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Community;
