'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, Link as LinkIcon, QrCode, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/50 backdrop-blur-sm text-sm font-medium">
              <Zap className="w-4 h-4 text-primary" />
              Professional URL Management
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="heading-primary">
                Shorten Links,{' '}
                <span className="gradient-text">
                  Amplify Results
                </span>
              </h1>
              <p className="text-large text-muted-foreground leading-relaxed">
                Create powerful short links with advanced analytics, QR codes, and custom branding. 
                Perfect for marketers, businesses, and developers who demand more than basic URL shortening.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: BarChart3, text: 'Advanced Analytics' },
                { icon: QrCode, text: 'QR Code Generation' },
                { icon: LinkIcon, text: 'Custom Domains' },
                { icon: Shield, text: 'Enterprise Security' },
              ].map((feature, index) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="button-hover group"
                asChild
              >
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="button-hover"
                asChild
              >
                <Link href="#demo">
                  View Demo
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs text-primary-foreground font-semibold border-2 border-background"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span>10,000+ users trust LinkShort</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:pl-8">
            {/* Main visual container */}
            <div className="relative">
              {/* Floating cards with glassmorphism */}
              <div className="space-y-4">
                {/* URL Input Card */}
                <div className="glass p-6 rounded-xl shadow-xl animate-slide-up">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <LinkIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Shorten URL</h3>
                        <p className="text-sm text-muted-foreground">Transform any long link</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-10 bg-muted/50 rounded-lg flex items-center px-3 text-sm text-muted-foreground">
                        https://example.com/very/long/url/with/parameters...
                      </div>
                      <div className="h-10 bg-primary/10 rounded-lg flex items-center px-3 text-sm font-medium text-primary">
                        linkshort.io/abc123
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Card */}
                <div className="glass p-6 rounded-xl shadow-xl animate-slide-up delay-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Real-time Analytics</h3>
                        <p className="text-sm text-muted-foreground">Track performance</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-500">2.4K</div>
                        <div className="text-xs text-muted-foreground">Clicks</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">89%</div>
                        <div className="text-xs text-muted-foreground">CTR</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code Card */}
                <div className="glass p-6 rounded-xl shadow-xl animate-slide-up delay-400">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted/30 rounded-lg flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">QR Code Ready</h3>
                      <p className="text-sm text-muted-foreground">Instant QR generation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}