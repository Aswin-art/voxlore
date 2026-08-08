"use client"

import { useState } from "react"
import { AdminSidebar } from "@/features/admin/components/admin-sidebar"
import { AdminHeader } from "@/features/admin/components/admin-header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-vox-cream text-[#1E2229] font-sans antialiased selection:bg-[#1E2229] selection:text-white flex flex-col">
      {/* Sidebar navigation */}
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        isCollapsed={isCollapsed}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main layout container adjusted for sidebar width on desktop */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-[padding] duration-200 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Top Header */}
        <AdminHeader
          onToggleMobileSidebar={() => setIsMobileOpen(true)}
          onToggleCollapseDesktop={() => setIsCollapsed(!isCollapsed)}
          isCollapsed={isCollapsed}
        />

        {/* Main Content View */}
        <main className="flex-1 min-w-0 w-full max-w-7xl mx-auto p-3 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
