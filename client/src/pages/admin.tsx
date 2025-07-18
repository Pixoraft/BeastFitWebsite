import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Star, 
  Download,
  ArrowLeft 
} from "lucide-react";

export default function Admin() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not admin
  if (!user?.isAdmin) {
    setLocation("/");
    return null;
  }

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/admin/stats'],
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['/api/admin/users'],
  });

  const { data: inquiries, isLoading: inquiriesLoading } = useQuery({
    queryKey: ['/api/admin/inquiries'],
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ['/api/reviews'],
  });

  const exportUsers = () => {
    window.open('/api/admin/export/users', '_blank');
  };

  const exportInquiries = () => {
    window.open('/api/admin/export/inquiries', '_blank');
  };

  const exportReviews = () => {
    window.open('/api/admin/export/reviews', '_blank');
  };

  if (statsLoading || usersLoading || inquiriesLoading || reviewsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setLocation("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <h1 className="text-3xl font-bold">BeastFit Arena - Admin Dashboard</h1>
          </div>
          <div className="flex space-x-2">
            <Button onClick={exportUsers} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Users</span>
            </Button>
            <Button onClick={exportInquiries} variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Inquiries</span>
            </Button>
            <Button onClick={exportReviews} variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Reviews</span>
            </Button>
          </div>
        </div>

        {/* Admin Help Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 text-primary">📊 Admin Dashboard Access Guide</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🔑 Login Credentials:</h3>
                <div className="bg-secondary/50 p-3 rounded font-mono text-sm">
                  <p>Email: admin@beastfitarena.com</p>
                  <p>Password: admin123</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📱 Contact Information:</h3>
                <div className="bg-secondary/50 p-3 rounded text-sm">
                  <p>WhatsApp: +91 91116 06607</p>
                  <p>All inquiries will be sent to this number</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">💡 Dashboard Features:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <ul className="space-y-1">
                  <li>• Track monthly visitors automatically</li>
                  <li>• View all registered users</li>
                  <li>• Export user data as CSV</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Monitor customer reviews</li>
                  <li>• Manage membership inquiries</li>
                  <li>• View contact form submissions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Monthly Visitors</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats?.monthlyVisitors?.toLocaleString() || '0'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <Users className="h-4 w-4 text-accent" />
                <span>Total Users</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {stats?.totalUsers?.toLocaleString() || '0'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <Star className="h-4 w-4 text-primary" />
                <span>Total Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats?.totalReviews?.toLocaleString() || '0'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-accent" />
                <span>Total Inquiries</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {stats?.totalInquiries?.toLocaleString() || '0'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Data */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="membership">Membership Inquiries</TabsTrigger>
            <TabsTrigger value="contact">Contact Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{user.goal}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Age: {user.age}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Joined: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review: any) => (
                    <div key={review.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{review.userName}</h3>
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-accent" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.message}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="membership">
            <Card>
              <CardHeader>
                <CardTitle>Membership Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries?.membershipInquiries?.map((inquiry: any) => (
                    <div key={inquiry.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{inquiry.name}</h3>
                        {inquiry.planType && (
                          <Badge variant="outline">{inquiry.planType}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                      <p className="text-sm text-muted-foreground">Interest: {inquiry.interest}</p>
                      {inquiry.message && (
                        <p className="text-muted-foreground mt-2">{inquiry.message}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )) || []}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries?.contactMessages?.map((message: any) => (
                    <div key={message.id} className="p-4 border border-border rounded-lg">
                      <h3 className="font-medium">{message.name}</h3>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                      <p className="text-sm text-muted-foreground">{message.phone}</p>
                      <p className="text-sm text-muted-foreground">Interest: {message.interest}</p>
                      {message.message && (
                        <p className="text-muted-foreground mt-2">{message.message}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )) || []}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
