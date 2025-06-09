'use client';

import Link from 'next/link';
import { Check, Crown, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const plans = [
  {
    name: 'Free',
    description: 'Perfect for personal use and small projects',
    price: '$0',
    period: 'forever',
    icon: Sparkles,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    features: [
      '100 links per month',
      'Basic analytics (30 days)',
      'QR code generation',
      'Standard support',
      'Link expiration',
      '1 user',
    ],
    limitations: [
      'No custom domains',
      'No bulk operations',
      'Limited API calls',
    ],
    cta: 'Get Started Free',
    href: '/register',
    popular: false,
  },
  {
    name: 'Premium',
    description: 'Ideal for professionals and growing businesses',
    price: '$19',
    period: 'per month',
    icon: Zap,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    features: [
      '10,000 links per month',
      'Advanced analytics (1 year)',
      'Custom domains',
      'Bulk operations',
      'Password protection',
      'Priority support',
      'Team collaboration (5 users)',
      'API access',
      'Custom QR codes',
      'Export data',
    ],
    limitations: [],
    cta: 'Start Premium Trial',
    href: '/register?plan=premium',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    price: 'Custom',
    period: 'contact us',
    icon: Crown,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    features: [
      'Unlimited links',
      'Unlimited analytics retention',
      'Multiple custom domains',
      'Advanced security features',
      'SSO integration',
      'Dedicated support',
      'Unlimited team members',
      'White-label solution',
      'Custom integrations',
      'SLA guarantee',
      'Advanced API features',
    ],
    limitations: [],
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
  },
];

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    question: 'What happens to my links if I downgrade?',
    answer: 'Your existing links will continue to work. However, you may lose access to premium features like advanced analytics for new links.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact support if you\'re not satisfied.'
  },
  {
    question: 'Is there a free trial for premium plans?',
    answer: 'Yes! Premium plan comes with a 14-day free trial. No credit card required to start.'
  }
];

export default function Pricing() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      <div className="relative container-custom">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="outline" className="px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              Pricing Plans
            </Badge>
            
            <h2 className="heading-secondary">
              Choose the perfect plan for{' '}
              <span className="gradient-text">your needs</span>
            </h2>
            
            <p className="text-large text-muted-foreground">
              Start free and scale as you grow. All plans include our core features
              with no hidden fees or setup costs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`
                  relative overflow-hidden
                  ${plan.popular 
                    ? 'ring-2 ring-primary shadow-xl scale-105' 
                    : 'card-modern hover:shadow-lg'
                  }
                  transition-all duration-300 hover:-translate-y-1
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="px-4 py-1 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center space-y-4 pt-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${plan.bgColor} flex items-center justify-center`}>
                    <plan.icon className={`w-8 h-8 ${plan.color}`} />
                  </div>

                  {/* Plan Details */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period !== 'contact us' && (
                        <span className="text-muted-foreground">/{plan.period}</span>
                      )}
                    </div>
                    {plan.name === 'Premium' && (
                      <p className="text-xs text-muted-foreground">
                        14-day free trial included
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* CTA Button */}
                  <Button
                    asChild
                    className={`w-full h-12 ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                    } button-hover`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <Link href={plan.href}>
                      {plan.cta}
                    </Link>
                  </Button>

                  <Separator />

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-border/50">
                        <h5 className="font-medium text-xs text-muted-foreground mb-2">
                          Limitations:
                        </h5>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation) => (
                            <li key={limitation} className="text-xs text-muted-foreground">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              All plans include SSL certificates, 99.9% uptime SLA, and email support.
              Enterprise plans include phone support and dedicated account management.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                No setup fees
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                30-day money back
              </span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h3>
              <p className="text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={faq.question} className="card-modern">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground">
              Join thousands of professionals already using LinkShort
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="button-hover">
                <Link href="/register">
                  Start Free Trial
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="button-hover">
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}