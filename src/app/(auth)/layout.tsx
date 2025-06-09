import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Sign in to your LinkShort account or create a new one.',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Back to Home */}
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="p-0">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>
            </Button>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-muted/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-secondary/10" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Content */}
        <div className="relative z-10 max-w-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">L</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Welcome to LinkShort
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The professional URL shortening platform with advanced analytics, 
              custom domains, and enterprise-grade security.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-3 text-left">
            {[
              '🔗 Unlimited short links',
              '📊 Real-time analytics',
              '🎨 Custom QR codes',
              '🛡️ Enterprise security',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <blockquote className="text-sm italic mb-3">
              "LinkShort transformed how we manage our marketing campaigns. 
              The analytics are incredible!"
            </blockquote>
            <div className="text-xs text-muted-foreground">
              — Sarah Chen, Marketing Director at TechFlow
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}