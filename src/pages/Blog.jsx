import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Search, 
  ArrowRight,
  Heart,
  Droplets,
  Users,
  TrendingUp,
  BookOpen,
  Filter
} from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'education', name: 'Education', count: 5 },
    { id: 'news', name: 'News', count: 3 },
    { id: 'stories', name: 'Success Stories', count: 2 },
    { id: 'health', name: 'Health Tips', count: 2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Complete Guide to Blood Donation: Everything You Need to Know",
      excerpt: "A comprehensive guide covering the entire blood donation process, from eligibility requirements to post-donation care. Learn about the different types of donations and their impact.",
      content: "Blood donation is one of the most impactful ways to help your community...",
      author: "Dr. Sarah Johnson",
      authorRole: "Hematologist",
      date: "2025-01-18",
      readTime: "8 min read",
      category: "education",
      tags: ["blood donation", "health", "guide"],
      featured: true,
      image: "/api/placeholder/600/300"
    },
    {
      id: 2,
      title: "Understanding Blood Types: Compatibility and Importance",
      excerpt: "Dive deep into the science of blood types, compatibility charts, and why knowing your blood type is crucial for both donors and recipients.",
      content: "Blood types are determined by the presence or absence of certain antigens...",
      author: "Dr. Michael Chen",
      authorRole: "Blood Bank Director",
      date: "2025-01-15",
      readTime: "6 min read",
      category: "education",
      tags: ["blood types", "science", "compatibility"],
      featured: false,
      image: "/api/placeholder/600/300"
    },
    {
      id: 3,
      title: "Local Blood Drive Saves 150 Lives in Emergency Response",
      excerpt: "Community comes together during medical emergency, with record-breaking donation numbers helping local hospitals meet critical blood shortage.",
      content: "Last weekend's emergency blood drive exceeded all expectations...",
      author: "Emily Rodriguez",
      authorRole: "Community Coordinator",
      date: "2025-01-12",
      readTime: "4 min read",
      category: "news",
      tags: ["community", "emergency", "success"],
      featured: true,
      image: "/api/placeholder/600/300"
    },
    {
      id: 4,
      title: "From Recipient to Advocate: Maria's Inspiring Journey",
      excerpt: "After receiving life-saving blood transfusions during surgery, Maria became a passionate advocate for blood donation, organizing drives in her community.",
      content: "Maria's story began three years ago when she needed emergency surgery...",
      author: "James Wilson",
      authorRole: "Staff Writer",
      date: "2025-01-10",
      readTime: "5 min read",
      category: "stories",
      tags: ["inspiration", "community", "advocacy"],
      featured: false,
      image: "/api/placeholder/600/300"
    },
    {
      id: 5,
      title: "Preparing for Your First Blood Donation: A Step-by-Step Guide",
      excerpt: "First-time donors often have questions and concerns. This guide walks you through everything you need to know before, during, and after your first donation.",
      content: "Donating blood for the first time can feel overwhelming...",
      author: "Nurse Patricia Adams",
      authorRole: "Donation Center Supervisor",
      date: "2025-01-08",
      readTime: "7 min read",
      category: "education",
      tags: ["first time", "preparation", "guide"],
      featured: false,
      image: "/api/placeholder/600/300"
    },
    {
      id: 6,
      title: "The Health Benefits of Regular Blood Donation",
      excerpt: "Beyond helping others, regular blood donation can provide health benefits for donors, including reduced risk of heart disease and improved cardiovascular health.",
      content: "While the primary motivation for blood donation is helping others...",
      author: "Dr. Amanda Foster",
      authorRole: "Cardiologist",
      date: "2025-01-05",
      readTime: "6 min read",
      category: "health",
      tags: ["health benefits", "cardiovascular", "wellness"],
      featured: false,
      image: "/api/placeholder/600/300"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Blood Donation Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed with the latest news, educational content, and inspiring stories from our blood donation community.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/20'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="text-red-600 dark:text-red-400" size={24} />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <Card key={post.id} className="group hover:scale-[1.02] transition-transform duration-300 cursor-pointer overflow-hidden">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="text-gray-400" size={48} />
                  </div>
                  <div className="p-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Featured</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="text-red-600 dark:text-red-400" size={24} />
            {selectedCategory === 'all' ? 'All Articles' : `${categories.find(cat => cat.id === selectedCategory)?.name} Articles`}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
            </span>
          </h2>
          
          {filteredPosts.length === 0 ? (
            <Card className="text-center py-12">
              <Search className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search terms or category filter.
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Card key={post.id} className="group hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="text-gray-400" size={32} />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                    {post.featured && (
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <Button variant="secondary" size="sm" className="group-hover:bg-red-600 group-hover:text-white transition-colors">
                      Read More
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-center p-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-red-600 dark:text-red-400" size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest articles, blood drive announcements, and community updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="sm:w-auto">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;