import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  loginSchema,
  insertReviewSchema,
  insertMembershipInquirySchema,
  insertContactMessageSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
      
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      
      // Store session on server (simple in-memory session)
      req.session = req.session || {};
      req.session.userId = user.id;
      
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Store session on server
      req.session = req.session || {};
      req.session.userId = user.id;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    try {
      if (req.session) {
        req.session.userId = null;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Logout failed" });
    }
  });

  // Review routes
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Membership inquiry routes
  app.post("/api/membership-inquiries", async (req, res) => {
    try {
      const inquiryData = insertMembershipInquirySchema.parse(req.body);
      const inquiry = await storage.createMembershipInquiry(inquiryData);
      res.json(inquiry);
    } catch (error) {
      res.status(400).json({ message: "Invalid inquiry data" });
    }
  });

  // Contact message routes
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // Admin routes
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getSiteStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/inquiries", async (req, res) => {
    try {
      const membershipInquiries = await storage.getAllMembershipInquiries();
      const contactMessages = await storage.getAllContactMessages();
      res.json({ membershipInquiries, contactMessages });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // CSV Export endpoints
  app.get("/api/admin/export/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const safeUsers = users.map(({ password, ...user }) => user);
      
      // Generate CSV
      const headers = ['ID', 'Name', 'Email', 'Phone', 'Age', 'Fitness Goals', 'Created At'];
      const csvRows = [headers.join(',')];
      
      safeUsers.forEach(user => {
        const row = [
          user.id,
          `"${user.name}"`,
          user.email,
          user.phone || '',
          user.age || '',
          `"${user.fitnessGoals || ''}"`,
          user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''
        ];
        csvRows.push(row.join(','));
      });
      
      const csvContent = csvRows.join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="beastfit-users.csv"');
      res.send(csvContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to export users" });
    }
  });

  app.get("/api/admin/export/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllMembershipInquiries();
      
      // Generate CSV
      const headers = ['ID', 'Name', 'Email', 'Phone', 'Message', 'Plan Type', 'Created At'];
      const csvRows = [headers.join(',')];
      
      inquiries.forEach(inquiry => {
        const row = [
          inquiry.id,
          `"${inquiry.name}"`,
          inquiry.email,
          inquiry.phone || '',
          `"${inquiry.message || ''}"`,
          inquiry.planType || '',
          inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : ''
        ];
        csvRows.push(row.join(','));
      });
      
      const csvContent = csvRows.join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="beastfit-inquiries.csv"');
      res.send(csvContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to export inquiries" });
    }
  });

  app.get("/api/admin/export/reviews", async (req, res) => {
    try {
      const reviews = await storage.getAllReviews();
      
      // Generate CSV
      const headers = ['ID', 'User Name', 'Rating', 'Message', 'Created At'];
      const csvRows = [headers.join(',')];
      
      reviews.forEach(review => {
        const row = [
          review.id,
          `"${review.userName}"`,
          review.rating,
          `"${review.message}"`,
          review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''
        ];
        csvRows.push(row.join(','));
      });
      
      const csvContent = csvRows.join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="beastfit-reviews.csv"');
      res.send(csvContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to export reviews" });
    }
  });

  // Visitor tracking
  app.post("/api/track-visit", async (req, res) => {
    try {
      await storage.incrementVisitors();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to track visit" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
