"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plane, Users, MapPin, Star, Shield, Clock, Phone, Mail, Crown, Sparkles, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")

  const features = [
    {
      icon: <Crown className="h-8 w-8 text-primary" />,
      title: "Premium Service",
      description: "Luxury travel management with personalized attention",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Booking",
      description: "Advanced security measures for safe transactions",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service and assistance",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Network",
      description: "Worldwide destinations and airline partnerships",
    },
  ]

  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: <Users className="h-6 w-6" /> },
    { label: "Destinations", value: "200+", icon: <MapPin className="h-6 w-6" /> },
    { label: "Airlines", value: "150+", icon: <Plane className="h-6 w-6" /> },
    { label: "Years Experience", value: "15+", icon: <Star className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-luxury-gradient">
      {/* Header */}
      <header className="nav-luxury sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-luxury-primary">BD TicketPro</h1>
                <p className="text-sm text-luxury-muted">Premium Travel Solutions</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-luxury-secondary hover:text-primary transition-colors">
                Home
              </a>
              <a href="#services" className="text-luxury-secondary hover:text-primary transition-colors">
                Services
              </a>
              <a href="#about" className="text-luxury-secondary hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-luxury-secondary hover:text-primary transition-colors">
                Contact
              </a>
              <Link href="/dashboard">
                <Button className="btn-luxury">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-luxury-fade-in">
            <div className="flex justify-center mb-6">
              <Badge className="badge-luxury text-lg px-4 py-2">
                <Crown className="h-4 w-4 mr-2" />
                Premium Travel Experience
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-luxury-primary mb-6 leading-tight">
              Your Gateway to
              <span className="text-primary block">Luxury Travel</span>
            </h1>
            <p className="text-xl text-luxury-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the finest in travel management with BD TicketPro. From domestic flights to international
              journeys, we provide premium booking services with unmatched elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="btn-luxury text-lg px-8 py-4">
                  <Plane className="h-5 w-5 mr-2" />
                  Start Booking
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-2 border-primary/30 hover:bg-primary/10 bg-transparent"
              >
                <Phone className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-luxury-accent/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-luxury-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-luxury-primary mb-2">{stat.value}</div>
                <div className="text-luxury-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="badge-luxury mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Our Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-luxury-primary mb-6">Premium Travel Features</h2>
            <p className="text-xl text-luxury-secondary max-w-2xl mx-auto">
              Discover the luxury features that make BD TicketPro the preferred choice for discerning travelers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="card-luxury animate-luxury-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-luxury-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-luxury-secondary">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-20 bg-luxury-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="badge-luxury mb-4">
                <Plane className="h-4 w-4 mr-2" />
                Quick Booking
              </Badge>
              <h2 className="text-4xl font-bold text-luxury-primary mb-4">Book Your Next Journey</h2>
              <p className="text-luxury-secondary">Experience seamless booking with our premium interface</p>
            </div>

            <Card className="card-luxury">
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-luxury-accent/50">
                    <TabsTrigger
                      value="home"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Plane className="h-4 w-4 mr-2" />
                      Flights
                    </TabsTrigger>
                    <TabsTrigger
                      value="hotels"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Hotels
                    </TabsTrigger>
                    <TabsTrigger
                      value="packages"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Packages
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="home" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="from" className="text-luxury-primary font-medium">
                          From
                        </Label>
                        <Input id="from" placeholder="Departure city" className="input-luxury" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to" className="text-luxury-primary font-medium">
                          To
                        </Label>
                        <Input id="to" placeholder="Destination city" className="input-luxury" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="departure" className="text-luxury-primary font-medium">
                          Departure Date
                        </Label>
                        <Input id="departure" type="date" className="input-luxury" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="return" className="text-luxury-primary font-medium">
                          Return Date
                        </Label>
                        <Input id="return" type="date" className="input-luxury" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link href="/dashboard">
                        <Button size="lg" className="btn-luxury px-12">
                          <Plane className="h-5 w-5 mr-2" />
                          Search Flights
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>

                  <TabsContent value="hotels" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-luxury-primary font-medium">
                          City
                        </Label>
                        <Input id="city" placeholder="Enter city name" className="input-luxury" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guests" className="text-luxury-primary font-medium">
                          Guests
                        </Label>
                        <Input id="guests" placeholder="Number of guests" className="input-luxury" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="checkin" className="text-luxury-primary font-medium">
                          Check-in Date
                        </Label>
                        <Input id="checkin" type="date" className="input-luxury" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="checkout" className="text-luxury-primary font-medium">
                          Check-out Date
                        </Label>
                        <Input id="checkout" type="date" className="input-luxury" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button size="lg" className="btn-luxury px-12">
                        <MapPin className="h-5 w-5 mr-2" />
                        Search Hotels
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="packages" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="destination" className="text-luxury-primary font-medium">
                          Destination
                        </Label>
                        <Input id="destination" placeholder="Where do you want to go?" className="input-luxury" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-luxury-primary font-medium">
                          Duration
                        </Label>
                        <Input id="duration" placeholder="Number of days" className="input-luxury" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-luxury-primary font-medium">
                          Budget Range
                        </Label>
                        <Input id="budget" placeholder="Your budget" className="input-luxury" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="travelers" className="text-luxury-primary font-medium">
                          Travelers
                        </Label>
                        <Input id="travelers" placeholder="Number of travelers" className="input-luxury" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button size="lg" className="btn-luxury px-12">
                        <Star className="h-5 w-5 mr-2" />
                        Find Packages
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="badge-luxury mb-4">
              <Phone className="h-4 w-4 mr-2" />
              Get in Touch
            </Badge>
            <h2 className="text-4xl font-bold text-luxury-primary mb-4">Contact Our Premium Team</h2>
            <p className="text-luxury-secondary max-w-2xl mx-auto">
              Ready to plan your next luxury journey? Our expert team is here to assist you 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-primary mb-2">Call Us</h3>
                <p className="text-luxury-secondary">+880 1234-567890</p>
                <p className="text-luxury-muted text-sm mt-1">24/7 Support Available</p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-primary mb-2">Email Us</h3>
                <p className="text-luxury-secondary">info@bdticketpro.com</p>
                <p className="text-luxury-muted text-sm mt-1">Quick Response Guaranteed</p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-primary mb-2">Visit Us</h3>
                <p className="text-luxury-secondary">Dhaka, Bangladesh</p>
                <p className="text-luxury-muted text-sm mt-1">Premium Office Location</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-accent/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-luxury-primary">BD TicketPro</h3>
            </div>
            <p className="text-luxury-secondary mb-6">Your trusted partner for premium travel experiences since 2009</p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-luxury-muted hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-luxury-muted hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-luxury-muted hover:text-primary transition-colors">
                Support
              </a>
            </div>
            <p className="text-luxury-muted">© 2024 BD TicketPro. All rights reserved. Crafted with luxury in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
