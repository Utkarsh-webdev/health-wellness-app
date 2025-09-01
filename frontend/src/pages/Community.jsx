import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import {
  MessageSquare,
  HelpCircle,
  Trophy,
  Heart,
  UserCircle,
  Trash2,
  SendHorizonal,
  Plus,
  Filter,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Motivation");
  const [filter, setFilter] = useState("All");
  const user = JSON.parse(localStorage.getItem("healthSyncUser"));

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/posts");
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
    }
  };

  // Create post
  const handlePost = async () => {
    if (!content.trim()) return;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/posts",
        { content, category },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setPosts([data, ...posts]);
      setContent("");
    } catch (err) {
      console.error("Error creating post:", err.message);
    }
  };

  // Like/unlike
  const handleLike = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/posts/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPosts(posts.map((p) => (p._id === id ? data : p)));
    } catch (err) {
      console.error("Error liking post:", err.message);
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err.message);
    }
  };

  // Category icon renderer
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Motivation":
        return <MessageSquare size={16} className="text-green-500" />;
      case "Question":
        return <HelpCircle size={16} className="text-blue-500" />;
      case "Achievement":
        return <Trophy size={16} className="text-yellow-500" />;
      default:
        return <MessageSquare size={16} className="text-gray-400" />;
    }
  };

  // Relative time formatter
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    for (let [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count > 0) return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  // Filter posts
  const filteredPosts =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
      <p className="text-gray-600 mb-6">
        Connect with others on their wellness journey, share achievements, and get motivated.
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
            <MessageSquare className="text-green-600" size={20} />
          </div>
          <p className="text-xl font-bold">{posts.length}</p>
          <p className="text-sm text-gray-500">Total Posts</p>
        </Card>
        <Card className="p-4 text-center bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
            <HelpCircle className="text-blue-600" size={20} />
          </div>
          <p className="text-xl font-bold">
            {posts.filter((p) => p.category === "Question").length}
          </p>
          <p className="text-sm text-gray-500">Questions</p>
        </Card>
        <Card className="p-4 text-center bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2">
            <Trophy className="text-yellow-600" size={20} />
          </div>
          <p className="text-xl font-bold">
            {posts.filter((p) => p.category === "Achievement").length}
          </p>
          <p className="text-sm text-gray-500">Achievements</p>
        </Card>
        <Card className="p-4 text-center bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
            <Heart className="text-red-600" size={20} />
          </div>
          <p className="text-xl font-bold">
            {posts.reduce((acc, p) => acc + p.likes.length, 0)}
          </p>
          <p className="text-sm text-gray-500">Total Likes</p>
        </Card>
      </div>

      {/* Post Input */}
      <Card className="p-5 mb-6 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
        <h2 className="font-semibold mb-4 text-lg flex items-center gap-2">
          <Plus className="w-5 h-5" /> Share with the Community
        </h2>

        <div className="flex items-start gap-3">
          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}
          </div>

          <div className="flex-1">
            {/* Textarea */}
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
              placeholder="Share your progress, ask a question, or motivate others..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />

            {/* Controls */}
            <div className="flex justify-between items-center mt-3">
              <select
                className="px-4 py-2 border border-green-400 rounded-full bg-white text-gray-700 
                focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Motivation</option>
                <option>Question</option>
                <option>Achievement</option>
              </select>

              <button
                onClick={handlePost}
                className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white 
                rounded-full hover:bg-green-600 transition"
              >
                <SendHorizonal size={16} />
                Post
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6">
  <Filter className="text-gray-500" size={18} />
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm 
               text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 
               hover:border-green-400 transition cursor-pointer"
  >
    <option value="All">🌍 All</option>
    <option value="Motivation">💡 Motivation</option>
    <option value="Question">❓ Question</option>
    <option value="Achievement">🏆 Achievement</option>
  </select>
</div>


      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="p-10 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <UserCircle className="mx-auto mb-3 text-gray-400" size={40} />
            <p className="font-medium">No posts yet</p>
            <p className="text-sm">
              Be the first to share something with the community!
            </p>
          </Card>
        ) : (
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-center">
                    {/* User Info + Category */}
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(post.category)}
                      <div>
                        <p className="font-semibold">{post.user?.name}</p>
                        <p className="text-xs text-gray-500">{post.category}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLike(post._id)}
                        className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition"
                      >
                        <Heart
                          size={18}
                          className={
                            post.likes.includes(user._id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }
                        />
                        {post.likes.length}
                      </button>

                      {post.user?._id === user._id && (
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="mt-3 text-gray-700">{post.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {timeAgo(post.createdAt)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Community;
