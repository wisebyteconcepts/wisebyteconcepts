import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
//import ManageServices from "@/components/admin/ManageServices";
//import ManageProducts from "@/components/admin/ManageProducts";
import logo from "@/assets/wbc-logo.png";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { services, products, resetToDefaults } = useData();
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleReset = () => {       
    resetToDefaults();
    setShowReset(false);
    alert("Data has been reset to defaults");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-secondary/30">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Wise Byte Concepts" className="w-8 h-8 rounded-lg" />
            <div>
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your services and products</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <a href="/" target="_blank" rel="noopener noreferrer">View Website</a>
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Total Services</h3>
            <p className="text-3xl font-bold">{services.length}</p>
          </Card>
          <Card className="p-6 border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Total Products</h3>
            <p className="text-3xl font-bold">{products.length}</p>
          </Card>
          <Card className="p-6 border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Last Updated</h3>
            <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
          </Card>
        </div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            {/*<ManageServices />*/}
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {/*<ManageProducts />*/}
          </TabsContent>
        </Tabs>

        {/* Settings Section */}
        <Card className="p-6 border-border/50 mt-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">Reset all data to default values</p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowReset(!showReset)}
            >
              Reset Data
            </Button>
          </div>

          {showReset && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
                This action cannot be undone. All custom services and products will be removed and replaced with defaults.
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="destructive" onClick={handleReset}>
                  Confirm Reset
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowReset(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
