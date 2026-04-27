import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/shared/ui/sonner";
import { Toaster } from "@/shared/ui/toaster";
import { TooltipProvider } from "@/shared/ui/tooltip";

import { AuthProvider } from "@/app/providers/AuthProvider";
import { DataProvider } from "@/features/data/DataContext";
import { ProtectedRoute } from "@/app/router/ProtectedRoute";

import Index from "@/pages/Index";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/Auth/LoginPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import ServicesAdminPage from "@/pages/Dashboard/ServicesAdminPage";
import ProductsAdminPage from "@/pages/Dashboard/ProductsAdminPage";
import SkillsAdminPage from "@/pages/Dashboard/SkillsAdminPage";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <DataProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/services/:serviceId" element={<ServiceDetail />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:productId" element={<ProductDetail />} />
                            <Route path="/contact" element={<Contact />} />

                            {/* Auth */}
                            <Route path="/login" element={<LoginPage />} />

                            {/* Admin (protected, admin role required) */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <DashboardPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard/services"
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <ServicesAdminPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard/products"
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <ProductsAdminPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard/skills"
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <SkillsAdminPage />
                                    </ProtectedRoute>
                                }
                            />

                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </DataProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;
