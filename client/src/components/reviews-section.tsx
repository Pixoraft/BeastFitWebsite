import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertReviewSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import { z } from "zod";

const reviewFormSchema = insertReviewSchema.extend({
  rating: z.number().min(1).max(5),
  message: z.string().min(10, "Review must be at least 10 characters long"),
});

export default function ReviewsSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['/api/reviews'],
  });

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      message: "",
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async (data: z.infer<typeof reviewFormSchema>) => {
      return apiRequest('POST', '/api/reviews', {
        ...data,
        userId: user!.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      setIsOpen(false);
      form.reset();
      toast({
        title: "Review Added!",
        description: "Thank you for your feedback.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const scrollToAuth = () => {
    const element = document.getElementById('auth');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onSubmit = (data: z.infer<typeof reviewFormSchema>) => {
    addReviewMutation.mutate(data);
  };

  const StarRating = ({ rating, onRatingChange, interactive = false }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= (interactive ? hoveredRating || rating : rating)
                ? 'fill-current text-accent'
                : 'text-gray-400'
            } ${interactive ? 'cursor-pointer hover:text-accent' : ''}`}
            onClick={interactive ? () => onRatingChange?.(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section id="reviews" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="spinner mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-primary">Members Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real transformations, real results. Hear from our community of dedicated members about their fitness journey at BeastFit Arena.
          </p>
        </div>
        
        {/* Reviews Display */}
        <div className="max-w-4xl mx-auto mb-12">
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review: any) => (
                <Card key={review.id} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold">{review.userName}</h4>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-300 italic">"{review.message}"</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
        
        {/* Add Review Button */}
        <div className="text-center">
          {user ? (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 px-8 py-3 font-semibold transition-all">
                  Add Your Review
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-secondary max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Your Review</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <div>
                              <StarRating 
                                rating={field.value} 
                                onRatingChange={field.onChange}
                                interactive={true}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Review</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share your experience at BeastFit Arena..."
                              className="bg-background border-border"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={addReviewMutation.isPending}
                    >
                      {addReviewMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className="spinner"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        'Submit Review'
                      )}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          ) : (
            <div>
              <Button 
                onClick={scrollToAuth}
                className="bg-primary hover:bg-primary/90 px-8 py-3 font-semibold transition-all"
              >
                Add Your Review
              </Button>
              <p className="text-sm text-gray-400 mt-2">*Login required to submit reviews</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
