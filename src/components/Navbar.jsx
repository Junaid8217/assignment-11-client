import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import Button from './ui/Button';
import { 
    Menu, 
    X, 
    Heart, 
    User, 
    Settings, 
    LogOut, 
    ChevronDown,
    Search,
    Gift,
    Users,
    BarChart3,
    BookOpen,
    Phone,
    HelpCircle
} from 'lucide-react';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const moreMenuRef = useRef(null);
    const location = useLocation();

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
                setIsMoreMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        const closeMenus = () => {
            setIsMenuOpen(false);
            setIsProfileMenuOpen(false);
            setIsMoreMenuOpen(false);
        };
        
        // Use a timeout to avoid synchronous setState in effect
        const timeoutId = setTimeout(closeMenus, 0);
        return () => clearTimeout(timeoutId);
    }, [location]);

    const logOut = () => {
        signOut(auth);
        setIsProfileMenuOpen(false);
    };

    // Navigation links for logged out users (minimum 3)
    const publicNavLinks = [
        { to: '/', label: 'Home', icon: Heart },
        { to: '/about', label: 'About', icon: Users },
        { to: '/search', label: 'Find Donors', icon: Search },
        { to: '/donation-request', label: 'Request Blood', icon: Gift }
    ];

    // Additional links for dropdown menu
    const moreLinks = [
        { to: '/blog', label: 'Blog & News', icon: BookOpen },
        { to: '/help', label: 'Help & Support', icon: HelpCircle },
        { to: '/contact', label: 'Contact Us', icon: Phone },
        { to: '/about', label: 'About Blood Donation', icon: Heart }
    ];

    // Navigation links for logged in users (minimum 5)
    const authenticatedNavLinks = [
        { to: '/', label: 'Home', icon: Heart },
        { to: '/search', label: 'Find Donors', icon: Search },
        { to: '/donation-request', label: 'Request Blood', icon: Gift },
        { to: '/donate', label: 'Donate Money', icon: Gift },
        { to: '/funding-page', label: 'All Funds', icon: BarChart3 }
    ];

    const navLinks = user ? authenticatedNavLinks : publicNavLinks;

    return (
        <nav className="w-full bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center gap-3 font-bold text-xl text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <Heart className="text-red-600 dark:text-red-400" size={24} />
                        </div>
                        <span className="hidden sm:block">BloodDonate</span>
                        <span className="sm:hidden">BD</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.to;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        isActive 
                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                                            : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                    }`}
                                >
                                    <Icon size={16} />
                                    {link.label}
                                </Link>
                            );
                        })}
                        
                        {/* More Dropdown */}
                        <div className="relative" ref={moreMenuRef}>
                            <button
                                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                            >
                                More
                                <ChevronDown size={16} className={`transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* More Dropdown Menu */}
                            {isMoreMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                                    {moreLinks.map((link) => {
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.to}
                                                to={link.to}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                onClick={() => setIsMoreMenuOpen(false)}
                                            >
                                                <Icon size={16} />
                                                {link.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <>

                                {/* Profile Dropdown */}
                                <div className="relative" ref={profileMenuRef}>
                                    <button
                                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                            {user.photoURL ? (
                                                <img 
                                                    src={user.photoURL} 
                                                    alt="Profile" 
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="text-red-600 dark:text-red-400" size={16} />
                                            )}
                                        </div>
                                        <span className="hidden xl:block font-medium">
                                            {user.displayName || 'User'}
                                        </span>
                                        <ChevronDown size={16} className={`transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Profile Dropdown Menu */}
                                    {isProfileMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {user.displayName || 'User'}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </p>
                                            </div>
                                            
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <BarChart3 size={16} />
                                                Dashboard
                                            </Link>
                                            
                                            <Link
                                                to="/dashboard/my-request"
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <User size={16} />
                                                My Profile
                                            </Link>
                                            
                                            <Link
                                                to="/dashboard/add-request"
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <Settings size={16} />
                                                Settings
                                            </Link>
                                            
                                            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                                                <button
                                                    onClick={logOut}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                                                >
                                                    <LogOut size={16} />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/register">
                                    <Button variant="secondary" size="sm">
                                        Register
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button size="sm">
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="space-y-2">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = location.pathname === link.to;
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                            isActive 
                                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                                                : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                        }`}
                                    >
                                        <Icon size={16} />
                                        {link.label}
                                    </Link>
                                );
                            })}
                            
                            {/* Additional Links in Mobile */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                <p className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    More
                                </p>
                                {moreLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = location.pathname === link.to;
                                    return (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                                isActive 
                                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                                                    : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                            }`}
                                        >
                                            <Icon size={16} />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                            {user ? (
                                <>
                                    <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                        Signed in as <span className="font-medium text-gray-900 dark:text-white">{user.displayName || 'User'}</span>
                                    </div>
                                    
                                    <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        <BarChart3 size={16} />
                                        Dashboard
                                    </Link>
                                    
                                    <Link to="/dashboard/my-request" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        <User size={16} />
                                        My Profile
                                    </Link>
                                    
                                    <button
                                        onClick={logOut}
                                        className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full text-left"
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Link to="/register">
                                        <Button variant="secondary" size="sm" className="w-full">
                                            Register
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button size="sm" className="w-full">
                                            Login
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;