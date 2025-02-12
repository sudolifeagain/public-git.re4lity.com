import React, { useEffect, useState } from 'react';
import { Github, Twitter, Menu, X, Calendar, Clock, ChevronLeft } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';

// Types
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

// Mock Data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    content: `
      TypeScript is a powerful addition to React development that brings static typing to your JavaScript code. 
      This helps catch errors early in development and provides better tooling support.

      ## Why TypeScript?

      TypeScript offers several benefits:
      - Static typing
      - Better IDE support
      - Improved maintainability
      - Enhanced code documentation

      ## Setting up a React TypeScript Project

      To get started, you can use Create React App with the TypeScript template:
      \`\`\`bash
      npx create-react-app my-app --template typescript
      \`\`\`

      This sets up a new React project with TypeScript configuration ready to go.
    `,
    excerpt: 'Learn how to leverage TypeScript in your React projects for better development experience.',
    date: '2024-03-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS',
    content: `
      Tailwind CSS is a utility-first CSS framework that allows you to build modern websites without leaving your HTML.
      
      ## Key Concepts

      Understanding these core concepts is essential:
      - Utility-first approach
      - Component extraction
      - Responsive design
      - Custom configuration

      ## Best Practices

      Here are some tips for working with Tailwind:
      1. Use component extraction for repeated patterns
      2. Leverage the configuration file
      3. Utilize the @apply directive when needed
    `,
    excerpt: 'Discover the power of utility-first CSS with Tailwind and learn best practices.',
    date: '2024-03-10',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }
];

// Components
const LoadingAnimation = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-2 border-white rounded-full">
        <div className="w-2 h-2 bg-white rounded-full animate-scan" />
      </div>
    </div>
  </div>
);

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="relative group px-4 py-2 text-gray-400 hover:text-white transition-colors"
  >
    <span>{children}</span>
    <div className="absolute -bottom-1 left-0 w-full h-0.5">
      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </div>
  </Link>
);

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {children}
    </>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold">Portfolio</Link>
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/hobby">Hobby</NavLink>
              <NavLink to="/circle">MyCircle</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-400 hover:text-white">Home</Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-400 hover:text-white">Blog</Link>
              <Link to="/hobby" className="block px-3 py-2 text-gray-400 hover:text-white">Hobby</Link>
              <Link to="/circle" className="block px-3 py-2 text-gray-400 hover:text-white">MyCircle</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-400 hover:text-white">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
};

// Pages
const Home = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-400">A passionate developer focused on creating beautiful and functional web experiences.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'Tailwind CSS'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Blog = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogPosts.map((post) => (
        <Link 
          key={post.id}
          to={`/blog/${post.id}`}
          className="group bg-gray-800 rounded-lg overflow-hidden transform transition-transform hover:-translate-y-1"
        >
          <div className="relative h-48">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium">Read More</span>
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-400 mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{post.date}</span>
              <Clock className="w-4 h-4 ml-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <button
            onClick={() => navigate('/blog')}
            className="text-blue-400 hover:text-blue-300"
          >
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/blog')}
        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back to Blog
      </button>
      
      <article className="prose prose-invert prose-lg max-w-none">
        <img 
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        
        <div className="flex items-center text-sm text-gray-400 mb-8">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{post.date}</span>
          <Clock className="w-4 h-4 ml-4 mr-2" />
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        
        <div className="markdown">
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                  {paragraph.replace('##', '').trim()}
                </h2>
              );
            }
            if (paragraph.startsWith('```')) {
              const code = paragraph.split('```')[1];
              return (
                <pre key={index} className="bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                  <code>{code}</code>
                </pre>
              );
            }
            if (paragraph.startsWith('-')) {
              return (
                <ul key={index} className="list-disc list-inside my-4">
                  <li>{paragraph.replace('-', '').trim()}</li>
                </ul>
              );
            }
            return paragraph.trim() && (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
};

const Hobby = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="text-4xl font-bold mb-8 text-center">My Hobbies</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: 'Photography',
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          title: 'Gaming',
          image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          title: 'Reading',
          image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ].map((hobby) => (
        <div key={hobby.title} className="bg-gray-800 rounded-lg overflow-hidden">
          <img src={hobby.image} alt={hobby.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{hobby.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MyCircle = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="text-4xl font-bold mb-8 text-center">My Circles</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        {
          name: 'Tech Community',
          description: 'A community of developers sharing knowledge and experiences.'
        },
        {
          name: 'Photography Club',
          description: 'Exploring the art of photography together.'
        }
      ].map((circle) => (
        <div key={circle.name} className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{circle.name}</h2>
          <p className="text-gray-400">{circle.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const Contact = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="text-4xl font-bold mb-8 text-center">Contact Me</h1>
    <div className="flex justify-center space-x-6">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
         className="group relative p-4 bg-gray-800 rounded-lg">
        <Github className="w-8 h-8" />
        <div className="absolute inset-0 border border-white/20 rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="animate-border-scan"></div>
          </div>
        </div>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
         className="group relative p-4 bg-gray-800 rounded-lg">
        <Twitter className="w-8 h-8" />
        <div className="absolute inset-0 border border-white/20 rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="animate-border-scan"></div>
          </div>
        </div>
      </a>
    </div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingAnimation />}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/hobby" element={<Hobby />} />
            <Route path="/circle" element={<MyCircle />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;