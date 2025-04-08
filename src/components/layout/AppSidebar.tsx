
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  Activity,
  Cloud, 
  Database,
  Settings,
  Map
} from 'lucide-react';
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
  SidebarFooter
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Traffic Analysis",
    path: "/traffic",
    icon: Map,
  },
  {
    title: "Air Quality",
    path: "/air-quality",
    icon: Cloud,
  },
  {
    title: "Energy Consumption",
    path: "/energy",
    icon: Activity,
  },
  {
    title: "Data Explorer",
    path: "/data",
    icon: Database,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  }
];

const AppSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-teal-600 flex items-center justify-center">
              <span className="text-white font-semibold">CT</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">CityTwin</h2>
              <p className="text-xs text-sidebar-foreground/60">AI Insights Platform</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild active={location.pathname === item.path}>
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <p className="text-xs text-sidebar-foreground/60">
            CityTwin AI Platform v1.0.0
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
