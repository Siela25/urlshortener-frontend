'use client';

import { 
  BarChart3, 
  Globe, 
  QrCode, 
  Shield, 
  Zap, 
  Link as LinkIcon,
  Eye,
  Download,
  Smartphone,
  Users,
  Clock,
  Target
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get detailed insights with real-time click tracking, geographic data, device analytics, and referrer information.',
    features: ['Real-time tracking', 'Geographic insights', 'Device breakdown', 'Referrer analysis'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    category: 'Analytics'
  },
  {
    icon: QrCode,
    title: 'QR Code Generation',
    description: 'Automatically generate high-quality QR codes for every shortened link with customizable colors and formats.',
    features: ['Auto-generation', 'Custom colors', 'Multiple formats', 'High resolution'],
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    category: 'Tools'
  },
  {
    icon: Globe,
    title: 'Custom Domains',
    description: 'Use your own domain for shortened links to maintain brand consistency and build trust with your audience.',
    features: ['Brand consistency', 'SSL certificates', 'DNS management', 'Multiple domains'],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    category: 'Branding'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Advanced security features including link expiration, password protection, and detailed access controls.',
    features: ['Link expiration', 'Password protection', 'Access controls', 'Audit logs'],
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    category: 'Security'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized infrastructure ensures your links redirect in under 100ms globally with 99.9% uptime guarantee.',
    features: ['<100ms redirects', '99.9% uptime', 'Global CDN', 'Smart caching'],
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    category: 'Performance'
  },
  {
    icon: LinkIcon,
    title: 'Bulk Operations',
    description: 'Create, manage, and analyze hundreds of links at once with our powerful bulk operations and CSV import.',
    features: ['CSV import', 'Bulk creation', 'Mass updates', 'Batch analytics'],
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    category: 'Productivity'
  }
];

const stats = [
  { icon: Eye, label: 'Links Created', value: '2.4M+' },
  { icon: Users, label: 'Active Users', value: '12,000+' },
  { icon: Clock, label: 'Avg Response Time', value: '<50ms' },
  { icon: Target, label: 'Uptime', value: '99.9%' }
];

export default function Features() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative container-custom">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="outline" className="px-4 py-2">
              <Smartphone className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            
            <h2 className="heading-secondary">
              Everything you need to manage links{' '}
              <span className="gradient-text">professionally</span>
            </h2>
            
            <p className="text-large text-muted-foreground">
              From basic URL shortening to enterprise-grade analytics and security features,
              LinkShort provides all the tools you need to succeed.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="card-modern group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {feature.category}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2">
                    {feature.features.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${feature.color.replace('text-', 'bg-')}`} />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl blur-xl" />
            <Card className="relative border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">Trusted by thousands</h3>
                    <p className="text-muted-foreground">
                      Join the growing community of professionals who rely on LinkShort
                    </p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                      <div key={stat.label} className="space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'API Access',
                description: 'RESTful API with comprehensive documentation for developers',
                icon: '🚀'
              },
              {
                title: 'Team Collaboration',
                description: 'Share links and analytics with your team members',
                icon: '👥'
              },
              {
                title: 'Export Data',
                description: 'Export your analytics data in CSV or JSON format',
                icon: '📊'
              }
            ].map((item) => (
              <div key={item.title} className="text-center space-y-3 p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                <div className="text-3xl">{item.icon}</div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}