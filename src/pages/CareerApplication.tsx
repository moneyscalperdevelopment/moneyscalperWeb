import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20),
  position: z.string().trim().min(1, "Please select a position"),
  linkedIn: z.string().trim().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  coverLetter: z.string().trim().min(50, "Cover letter must be at least 50 characters").max(2000),
  resumeFile: z.string().optional()
});

type ApplicationData = z.infer<typeof applicationSchema>;

const jobListings = [
  {
    id: "1",
    title: "Senior Blockchain Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build and optimize our cutting-edge blockchain infrastructure for real-time trading.",
    requirements: [
      "5+ years experience with Solidity and smart contracts",
      "Deep understanding of DeFi protocols",
      "Experience with Web3.js or Ethers.js",
      "Strong knowledge of blockchain security"
    ]
  },
  {
    id: "2",
    title: "Quantitative Trading Analyst",
    department: "Trading",
    location: "New York, NY / Remote",
    type: "Full-time",
    description: "Develop and implement algorithmic trading strategies using advanced data analysis.",
    requirements: [
      "Advanced degree in Mathematics, Physics, or Computer Science",
      "3+ years experience in quantitative trading",
      "Proficiency in Python, R, or MATLAB",
      "Strong statistical and mathematical modeling skills"
    ]
  },
  {
    id: "3",
    title: "Product Designer (UI/UX)",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design intuitive and beautiful interfaces for our next-gen trading platform.",
    requirements: [
      "4+ years experience in product design",
      "Portfolio showcasing fintech or trading platform work",
      "Expert in Figma and design systems",
      "Understanding of Web3 and crypto trading"
    ]
  },
  {
    id: "4",
    title: "Customer Success Manager",
    department: "Support",
    location: "London, UK / Remote",
    type: "Full-time",
    description: "Help our traders succeed by providing exceptional support and guidance.",
    requirements: [
      "2+ years in customer success or support",
      "Deep knowledge of crypto trading",
      "Excellent communication skills",
      "Experience with CRM and support tools"
    ]
  },
  {
    id: "5",
    title: "Security Engineer",
    department: "Security",
    location: "Remote",
    type: "Full-time",
    description: "Protect our platform and users with world-class security infrastructure.",
    requirements: [
      "5+ years in security engineering",
      "Experience with penetration testing",
      "Knowledge of cryptographic protocols",
      "Certifications like CISSP or CEH preferred"
    ]
  },
  {
    id: "6",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Drive growth and build our brand in the competitive crypto trading space.",
    requirements: [
      "3+ years in fintech or crypto marketing",
      "Experience with growth marketing strategies",
      "Strong content creation and SEO skills",
      "Data-driven approach to marketing"
    ]
  }
];

const CareerApplication = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [job, setJob] = useState<typeof jobListings[0] | null>(null);

  useEffect(() => {
    const foundJob = jobListings.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
    } else {
      toast.error("Job not found");
      navigate("/careers");
    }
  }, [jobId, navigate]);

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Partial<ApplicationData> = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      position: job?.title || "",
      linkedIn: formData.get("linkedIn") as string,
      coverLetter: formData.get("coverLetter") as string
    };

    try {
      const validated = applicationSchema.parse(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Application submitted successfully! We'll be in touch soon.");
      navigate("/careers");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/careers")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Button>

          {/* Job Details Card */}
          <Card className="mb-8 border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <CardTitle className="text-3xl">{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {job.type}
                </Badge>
              </div>
              
              <CardDescription className="text-base">
                {job.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div>
                <h4 className="font-semibold mb-3">Key Requirements:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Submit Your Application</CardTitle>
              <CardDescription>
                Fill out the form below to apply for this position. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleApply} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                    <Input 
                      id="linkedIn" 
                      name="linkedIn" 
                      type="url" 
                      placeholder="https://linkedin.com/in/yourprofile" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter *</Label>
                  <Textarea 
                    id="coverLetter" 
                    name="coverLetter" 
                    placeholder="Tell us why you're a great fit for this role..."
                    className="min-h-[200px]"
                    required 
                  />
                  <p className="text-xs text-muted-foreground">Minimum 50 characters</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume / CV</Label>
                  <Input 
                    id="resume" 
                    name="resume" 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (Max 5MB)</p>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/careers")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CareerApplication;
