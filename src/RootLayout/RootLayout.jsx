import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default RootLayout;