import { Link } from 'react-router';
import Card from './ui/Card';

const NavigationTest = () => {
  const allPages = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/blog', name: 'Blog' },
    { path: '/help', name: 'Help & Support' },
    { path: '/privacy-policy', name: 'Privacy Policy' },
    { path: '/terms-of-service', name: 'Terms of Service' },
    { path: '/search', name: 'Search Donors' },
    { path: '/donation-request', name: 'Donation Request' },
    { path: '/register', name: 'Register' },
    { path: '/login', name: 'Login' }
  ];

  return (
    <Card className="m-4">
      <h2 className="text-xl font-bold mb-4">Navigation Test - All Pages</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {allPages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm text-center"
          >
            {page.name}
          </Link>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        Click any link above to test navigation to all pages
      </p>
    </Card>
  );
};

export default NavigationTest;