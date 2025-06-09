import { Metadata } from 'next';
import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import QuickShorten from '@/components/landing/quick-shorten';
import Testimonials from '@/components/landing/testimonials';
import Pricing from '@/components/landing/pricing';

export const metadata: Metadata = {
  title: 'Professional URL Shortener with Advanced Analytics',
  description: 'Create short, branded links with powerful analytics. Track clicks, analyze traffic, and optimize your marketing campaigns with LinkShort.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Quick Shorten Demo */}
      <QuickShorten />
      
      {/* Features Section */}
      <Features />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Pricing */}
      <Pricing />
    </div>
  );
}