'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Copy, ExternalLink, QrCode, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import apiClient from '@/lib/api';
import { publicShortenSchema } from '@/lib/validators';
import type { PublicShortenFormData } from '@/lib/validators';

export default function QuickShorten() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<{
    shortUrl: string;
    shortCode: string;
    originalUrl: string;
  } | null>(null);

  const shortenMutation = useMutation({
    mutationFn: async (data: PublicShortenFormData) => {
      const response = await apiClient.post('/api/v1/shorten', data);
      return response;
    },
    onSuccess: (data) => {
      setResult({
        shortUrl: data.short_url,
        shortCode: data.short_code,
        originalUrl: data.original_url,
      });
      toast.success('Link shortened successfully!');
    },
    onError: (error: any) => {
      toast.error(error.error || 'Failed to shorten URL');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = publicShortenSchema.safeParse({ original_url: url });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    shortenMutation.mutate({ original_url: url });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <section id="demo" className="relative py-20 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Section Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-sm font-medium">
              <Sparkles className="w-4 h-4 text-primary" />
              Try it now - No signup required
            </div>
            
            <h2 className="heading-secondary">
              See the magic in action
            </h2>
            
            <p className="text-large text-muted-foreground max-w-2xl mx-auto">
              Transform any long URL into a short, shareable link in seconds. 
              Experience the power of LinkShort before creating your account.
            </p>
          </div>

          {/* Demo Form */}
          <Card className="card-modern max-w-2xl mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="demo-url" className="text-sm font-medium">
                    Enter a URL to shorten
                  </label>
                  <div className="flex gap-3">
                    <Input
                      id="demo-url"
                      placeholder="https://example.com/very/long/url/with/parameters"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1 h-12 text-base"
                      disabled={shortenMutation.isPending}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={!url || shortenMutation.isPending}
                      className="px-8 button-hover"
                    >
                      {shortenMutation.isPending ? (
                        <div className="loading-dots">Shortening</div>
                      ) : (
                        'Shorten'
                      )}
                    </Button>
                  </div>
                </div>

                {/* Results */}
                {result && (
                  <div className="space-y-4 animate-fade-in">
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-left">Your shortened link:</h3>
                      
                      {/* Short URL Result */}
                      <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex-1">
                          <div className="font-mono text-lg font-semibold text-primary">
                            {result.shortUrl}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {result.originalUrl}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(result.shortUrl)}
                            className="button-hover"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(result.shortUrl, '_blank')}
                            className="button-hover"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.info('QR code generation available for registered users')}
                            className="button-hover"
                          >
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Feature callout */}
                      <div className="text-center p-4 bg-muted/50 rounded-lg border border-dashed border-border">
                        <p className="text-sm text-muted-foreground">
                          <strong>Want more?</strong> Create an account to access analytics, custom domains, QR codes, and advanced features.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { label: 'Links Created', value: '2.4M+', color: 'text-blue-500' },
              { label: 'Clicks Tracked', value: '847M+', color: 'text-green-500' },
              { label: 'Active Users', value: '12K+', color: 'text-purple-500' },
            ].map((stat) => (
              <div key={stat.label} className="text-center space-y-1">
                <div className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}