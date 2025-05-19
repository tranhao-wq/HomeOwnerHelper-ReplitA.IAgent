import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission - in a real app, this would call an API endpoint
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form data:", data);
      
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact Hero Section */}
      <section className="bg-primary/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Have questions about workshops, becoming a host, or need help with your account? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-heading font-bold mb-6">Get in Touch</h2>
            <p className="text-neutral-600 mb-8">
              Whether you're looking for more information about workshops, interested in becoming a host,
              or just want to say hello, we'd love to hear from you. Fill out the form or use our contact
              details below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <i className="fa-solid fa-location-dot text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Our Location</h3>
                  <p className="text-neutral-600">
                    123 Workshop Avenue<br />
                    Portland, OR 97205
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <i className="fa-solid fa-envelope text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-neutral-600">
                    <a href="mailto:hello@homeskills.com" className="hover:text-primary">
                      hello@homeskills.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <i className="fa-solid fa-phone text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-neutral-600">
                    <a href="tel:+15035551234" className="hover:text-primary">
                      (503) 555-1234
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <i className="fa-solid fa-clock text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Office Hours</h3>
                  <p className="text-neutral-600">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-neutral-100 hover:bg-primary/10 hover:text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a 
                  href="#" 
                  className="bg-neutral-100 hover:bg-primary/10 hover:text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a 
                  href="#" 
                  className="bg-neutral-100 hover:bg-primary/10 hover:text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a 
                  href="#" 
                  className="bg-neutral-100 hover:bg-primary/10 hover:text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(503) 555-1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="workshops">Workshop Information</SelectItem>
                              <SelectItem value="hosting">Become a Host</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Let us know how we can help..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-3">
                How do I book a workshop?
              </h3>
              <p className="text-neutral-600">
                Simply browse through our available workshops, select the one you're interested in, 
                and click "Book Now" if spots are available. You'll receive a confirmation email 
                with all the details.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-3">
                Can I cancel my booking?
              </h3>
              <p className="text-neutral-600">
                Yes, you can cancel your booking up to 48 hours before the workshop starts. 
                Simply go to your account dashboard and select the booking you wish to cancel.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-3">
                How do I become a workshop host?
              </h3>
              <p className="text-neutral-600">
                We're always looking for skilled hosts! Use our contact form and select "Become a Host" 
                as the subject. Our team will reach out with more information about our requirements and setup process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-3">
                Are there any fees to use HomeSkills?
              </h3>
              <p className="text-neutral-600">
                HomeSkills is completely free for homeowners to browse and book workshops. Payments for 
                workshops are handled directly with the host at the venue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
            Visit Our Office
          </h2>
          
          <div className="h-96 bg-neutral-100 rounded-xl overflow-hidden shadow-md">
            {/* In a real app, this would be an actual map component */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <i className="fa-solid fa-map-location-dot text-primary text-5xl mb-4"></i>
                <p className="text-lg font-medium">123 Workshop Avenue, Portland, OR 97205</p>
                <p className="text-neutral-500">Map loading...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
