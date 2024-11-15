import React, { useState } from "react";

interface Resource {
  id: number;
  title: string;
  description: string;
  link: string;
  category: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Organic Farming Basics",
    description: "Learn the fundamentals of organic farming techniques.",
    link: "https://example.com/organic-farming",
    category: "Guide",
  },
  {
    id: 2,
    title: "Sustainable Agriculture Practices",
    description: "Discover how to adopt sustainable methods for long-term farming success.",
    link: "https://example.com/sustainable-agriculture",
    category: "Video",
  },
  {
    id: 3,
    title: "Understanding Market Trends",
    description: "Analyze market trends to maximize profits and reduce risks.",
    link: "https://example.com/market-trends",
    category: "Report",
  },
];

const categories = ["All", "Guide", "Video", "Report"];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Guide':
      return 'bg-emerald-100 text-emerald-800';
    case 'Video':
      return 'bg-purple-100 text-purple-800';
    case 'Report':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

const getCategoryButtonColor = (isSelected: boolean, category: string) => {
  if (isSelected) {
    switch (category) {
      case 'Guide':
        return 'bg-emerald-500 text-white';
      case 'Video':
        return 'bg-purple-500 text-white';
      case 'Report':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  }
  return 'bg-gray-100 text-gray-600 hover:bg-gray-200';
};

const EducationalResources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Educational Resources
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of farming resources to enhance your agricultural knowledge
            and improve your farming practices.
          </p>
        </div>

        {/* Search and Filters Container */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${getCategoryButtonColor(
                  selectedCategory === category,
                  category
                )}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Cards */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {resource.title}
                    </h2>
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(
                        resource.category
                      )}`}
                    >
                      {resource.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {resource.description}
                  </p>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
                  >
                    View Resource
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01"
                />
              </svg>
              <p className="mt-4 text-gray-600 text-lg">No resources found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationalResources;