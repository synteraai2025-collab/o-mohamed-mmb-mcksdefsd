import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { BarChart3, Home, Settings, Users, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Analytical Dashboard",
  description: "Comprehensive data visualization and analysis platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar Navigation */}
          <nav className="w-64 bg-white shadow-lg border-r border-gray-200">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-8">
                <BarChart3 className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
              </div>
              
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/" 
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Overview</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard" 
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/users" 
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Users</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/settings" 
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
