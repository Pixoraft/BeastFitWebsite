import { 
  users, 
  reviews, 
  membershipInquiries, 
  contactMessages,
  siteStats,
  type User, 
  type InsertUser,
  type Review,
  type InsertReview,
  type MembershipInquiry,
  type InsertMembershipInquiry,
  type ContactMessage,
  type InsertContactMessage,
  type SiteStats
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Review operations
  createReview(review: InsertReview): Promise<Review>;
  getAllReviews(): Promise<(Review & { userName: string })[]>;
  getReviewsByUser(userId: number): Promise<Review[]>;
  
  // Membership inquiry operations
  createMembershipInquiry(inquiry: InsertMembershipInquiry): Promise<MembershipInquiry>;
  getAllMembershipInquiries(): Promise<MembershipInquiry[]>;
  
  // Contact message operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  
  // Stats operations
  getSiteStats(): Promise<SiteStats>;
  incrementVisitors(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private reviews: Map<number, Review>;
  private membershipInquiries: Map<number, MembershipInquiry>;
  private contactMessages: Map<number, ContactMessage>;
  private stats: SiteStats;
  private currentUserId: number;
  private currentReviewId: number;
  private currentInquiryId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.reviews = new Map();
    this.membershipInquiries = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentReviewId = 1;
    this.currentInquiryId = 1;
    this.currentMessageId = 1;
    
    this.stats = {
      id: 1,
      monthlyVisitors: 0,
      totalUsers: 0,
      totalReviews: 0,
      totalInquiries: 0,
    };
    
    // Create default admin user
    this.createUser({
      name: "Admin User",
      email: "admin@beastfitarena.com",
      password: "admin123",
      phone: "+1234567890",
      age: 30,
      goal: "management"
    }).then(user => {
      // Update admin status
      const adminUser = { ...user, isAdmin: true };
      this.users.set(user.id, adminUser);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: false,
      createdAt: new Date()
    };
    this.users.set(id, user);
    this.stats.totalUsers = this.users.size;
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    this.stats.totalReviews = this.reviews.size;
    return review;
  }

  async getAllReviews(): Promise<(Review & { userName: string })[]> {
    const reviews = Array.from(this.reviews.values());
    return reviews.map(review => {
      const user = this.users.get(review.userId);
      return {
        ...review,
        userName: user?.name || 'Unknown User'
      };
    });
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      review => review.userId === userId
    );
  }

  async createMembershipInquiry(insertInquiry: InsertMembershipInquiry): Promise<MembershipInquiry> {
    const id = this.currentInquiryId++;
    const inquiry: MembershipInquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date(),
      message: insertInquiry.message || null,
      planType: insertInquiry.planType || null
    };
    this.membershipInquiries.set(id, inquiry);
    this.stats.totalInquiries = this.membershipInquiries.size + this.contactMessages.size;
    return inquiry;
  }

  async getAllMembershipInquiries(): Promise<MembershipInquiry[]> {
    return Array.from(this.membershipInquiries.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      message: insertMessage.message || null
    };
    this.contactMessages.set(id, message);
    this.stats.totalInquiries = this.membershipInquiries.size + this.contactMessages.size;
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getSiteStats(): Promise<SiteStats> {
    return {
      ...this.stats,
      totalUsers: this.users.size,
      totalReviews: this.reviews.size,
      totalInquiries: this.membershipInquiries.size + this.contactMessages.size
    };
  }

  async incrementVisitors(): Promise<void> {
    this.stats.monthlyVisitors += 1;
  }
}

export const storage = new MemStorage();
