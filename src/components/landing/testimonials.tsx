'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
    image: '/avatars/sarah.jpg',
    content: 'LinkShort transformed our marketing campaigns. The analytics are incredibly detailed, and the custom domains feature helps maintain our brand consistency across all channels.',
    rating: 5,
    featured: true
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Product Manager',
    company: 'StartupXYZ',
    image: '/avatars/marcus.jpg',
    content: 'The bulk operations feature saved us countless hours. We can now manage thousands of links efficiently, and the real-time analytics help us make data-driven decisions.',
    rating: 5,
    featured: false
  },
  {
    name: 'Emily Thompson',
    role: 'Social Media Manager',
    company: 'CreativeAgency',
    image: '/avatars/emily.jpg',
    content: 'QR code generation is a game-changer for our offline campaigns. The integration is seamless, and our clients love the professional presentation.',
    rating: 5,
    featured: false
  },
  {
    name: 'David Kim',
    role: 'Developer',
    company: 'DevCorp',
    image: '/avatars/david.jpg',
    content: 'The API documentation is excellent, and the response times are lightning fast. Integration took less than an hour, and it scales beautifully with our applications.',
    rating: 5,
    featured: true
  },
  {
    name: 'Lisa Wang',
    role: 'Growth Manager',
    company: 'E-commerce Plus',
    image: '/avatars/lisa.jpg',
    content: 'LinkShort\'s geographic analytics helped us identify new markets. The insights are actionable, and the security features give us peace of mind.',
    rating: 5,
    featured: false
  },
  {
    name: 'Alex Morgan',
    role: 'Content Creator',
    company: 'Independent',
    image: '/avatars/alex.jpg',
    content: 'As a content creator, I need reliable link tracking. LinkShort delivers with beautiful analytics dashboards and never lets me down with uptime.',
    rating: 5,
    featured: false
  }
];

const companies = [
  { name: 'TechFlow', logo: '/companies/techflow.svg' },
  { name: 'StartupXYZ', logo: '/companies/startupxyz.svg' },
  { name: 'CreativeAgency', logo: '/companies/creative.svg' },
  { name: 'DevCorp', logo: '/companies/devcorp.svg' },
  { name: 'E-commerce Plus', logo: '/companies/ecommerce.svg' },
  { name: 'MediaGroup', logo: '/companies/media.svg' }
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      
      <div className="relative container-custom">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-sm font-medium">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              Loved by professionals worldwide
            </div>
            
            <h2 className="heading-secondary">
              Don't just take our word for it
            </h2>
            
            <p className="text-large text-muted-foreground">
              Thousands of professionals trust LinkShort to power their link management.
              Here's what they have to say about their experience.
            </p>
          </div>

          {/* Featured Testimonials */}
          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials
              .filter(t => t.featured)
              .map((testimonial, index) => (
                <Card 
                  key={testimonial.name}
                  className="card-modern relative overflow-hidden"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {/* Quote Icon */}
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Quote className="w-6 h-6 text-primary" />
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 text-yellow-500 fill-yellow-500" 
                          />
                        ))}
                      </div>
                      
                      {/* Content */}
                      <blockquote className="text-lg leading-relaxed">
                        "{testimonial.content}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials
              .filter(t => !t.featured)
              .map((testimonial, index) => (
                <Card 
                  key={testimonial.name}
                  className="card-modern group hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 text-yellow-500 fill-yellow-500" 
                          />
                        ))}
                      </div>
                      
                      {/* Content */}
                      <blockquote className="text-sm leading-relaxed">
                        "{testimonial.content}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className="text-xs">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{testimonial.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Companies Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                Trusted by leading companies
              </h3>
              <p className="text-muted-foreground">
                Join thousands of companies already using LinkShort
              </p>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
              {companies.map((company) => (
                <div 
                  key={company.name} 
                  className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <div className="w-24 h-12 bg-muted/30 rounded-lg flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {company.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Customer Satisfaction', value: '98%' },
              { label: 'Average Rating', value: '4.9/5' },
              { label: 'Countries Served', value: '120+' },
              { label: 'Enterprise Clients', value: '500+' }
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}