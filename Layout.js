
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import {
  Shield,
  Home,
  Upload,
  AlertTriangle,
  FileText,
  Users,
  Settings,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AquaSentinelBot from "./Components/chatbot/AquaSentinelBot";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.log("User not authenticated");
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await User.logout();
    window.location.reload();
  };

  const isAdmin = user?.role === 'admin';

  const userNavigation = [
    {
      title: "Home",
      url: createPageUrl("Home"),
      icon: Home,
    },
    {
      title: "Security Dashboard",
      url: createPageUrl("Dashboard"),
      icon: LayoutDashboard,
    },
    {
      title: "Upload & Scan",
      url: createPageUrl("Upload"),
      icon: Upload,
    },
    {
      title: "Support",
      url: createPageUrl("Support"),
      icon: HelpCircle,
    }
  ];

  const adminNavigation = [
    {
      title: "Admin Dashboard",
      url: createPageUrl("AdminDashboard"),
      icon: Shield,
    },
    {
      title: "Alerts Management",
      url: createPageUrl("AlertsManagement"),
      icon: AlertTriangle,
    },
    {
      title: "Logs Management",
      url: createPageUrl("LogsManagement"),
      icon: FileText,
    },
    {
      title: "User Management",
      url: createPageUrl("UserManagement"),
      icon: Users,
    },
    {
      title: "Settings",
      url: createPageUrl("Settings"),
      icon: Settings,
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#B9E5E8]/20 via-[#A7E6FF]/20 to-white">
        <style>
          {`
            :root {
              --navy-deep: #4A628A;
              --aqua-soft: #7AB2D3;
              --navy-light: #6A82AA;
              --aqua-light: #B9E5E8;
              --aqua-highlight: #A7E6FF;
            }
          `}
        </style>

        <Sidebar className="border-r border-white/20 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-lg">
          <SidebarHeader className="border-b border-white/20 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--navy-deep)] to-[var(--aqua-soft)] rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-[var(--navy-deep)] text-lg">AquaShield</h2>
                <p className="text-xs text-gray-500">IDS Security System</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-[var(--navy-deep)] uppercase tracking-wider px-2 py-2">
                {isAdmin ? 'Admin Panel' : 'Security Center'}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {(isAdmin ? adminNavigation : userNavigation).map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-[var(--aqua-soft)]/20 hover:text-[var(--navy-deep)] transition-all duration-300 rounded-xl mb-1 group ${
                          location.pathname === item.url ? 'bg-[var(--aqua-soft)]/30 text-[var(--navy-deep)] shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {!isAdmin && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-[var(--navy-deep)] uppercase tracking-wider px-2 py-2">
                  Quick Actions
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-4 py-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">System Status: Secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Upload className="w-4 h-4 text-[var(--aqua-soft)]" />
                      <span className="text-gray-600">Last Scan: Today</span>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t border-white/20 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--aqua-soft)] to-[var(--navy-deep)] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.full_name?.[0] || user?.email?.[0] || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[var(--navy-deep)] text-sm truncate">
                  {user?.full_name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {isAdmin ? 'Administrator' : 'Security User'}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full border-[var(--navy-deep)]/20 hover:bg-[var(--navy-deep)]/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-[var(--aqua-soft)]/20 p-2 rounded-lg transition-colors duration-200" />
                <h1 className="text-xl font-bold text-[var(--navy-deep)]">AquaShield</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>

        <AquaSentinelBot user={user} />
      </div>
    </SidebarProvider>
  );
}
