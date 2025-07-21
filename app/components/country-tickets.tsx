"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plane, MapPin, Star, Search, Filter, Crown, Globe, Calendar } from "lucide-react"

interface CountryTicket {
  id: string
  country: string
  city: string
  flag: string
  price: number
  currency: string
  airline: string
  duration: string
  stops: number
  rating: number
  popular: boolean
  luxury: boolean
}

const countryTickets: CountryTicket[] = [
  {
    id: "1",
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    price: 45000,
    currency: "BDT",
    airline: "Thai Airways",
    duration: "3h 45m",
    stops: 0,
    rating: 4.8,
    popular: true,
    luxury: true,
  },
  {
    id: "2",
    country: "Malaysia",
    city: "Kuala Lumpur",
    flag: "🇲🇾",
    price: 38000,
    currency: "BDT",
    airline: "Malaysia Airlines",
    duration: "2h 30m",
    stops: 0,
    rating: 4.7,
    popular: true,
    luxury: false,
  },
  {
    id: "3",
    country: "Singapore",
    city: "Singapore",
    flag: "🇸🇬",
    price: 52000,
    currency: "BDT",
    airline: "Singapore Airlines",
    duration: "3h 15m",
    stops: 0,
    rating: 4.9,
    popular: true,
    luxury: true,
  },
  {
    id: "4",
    country: "India",
    city: "Delhi",
    flag: "🇮🇳",
    price: 25000,
    currency: "BDT",
    airline: "IndiGo",
    duration: "1h 45m",
    stops: 0,
    rating: 4.5,
    popular: true,
    luxury: false,
  },
  {
    id: "5",
    country: "UAE",
    city: "Dubai",
    flag: "🇦🇪",
    price: 65000,
    currency: "BDT",
    airline: "Emirates",
    duration: "4h 30m",
    stops: 0,
    rating: 4.9,
    popular: true,
    luxury: true,
  },
  {
    id: "6",
    country: "Nepal",
    city: "Kathmandu",
    flag: "🇳🇵",
    price: 18000,
    currency: "BDT",
    airline: "Buddha Air",
    duration: "1h 20m",
    stops: 0,
    rating: 4.3,
    popular: false,
    luxury: false,
  },
  {
    id: "7",
    country: "Turkey",
    city: "Istanbul",
    flag: "🇹🇷",
    price: 75000,
    currency: "BDT",
    airline: "Turkish Airlines",
    duration: "6h 15m",
    stops: 0,
    rating: 4.8,
    popular: true,
    luxury: true,
  },
  {
    id: "8",
    country: "Qatar",
    city: "Doha",
    flag: "🇶🇦",
    price: 58000,
    currency: "BDT",
    airline: "Qatar Airways",
    duration: "5h 00m",
    stops: 0,
    rating: 4.9,
    popular: true,
    luxury: true,
  },
]

export default function CountryTickets() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredTickets = countryTickets.filter((ticket) => {
    const matchesSearch =
      ticket.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.airline.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "popular" && ticket.popular) ||
      (selectedFilter === "luxury" && ticket.luxury) ||
      (selectedFilter === "budget" && ticket.price < 40000)

    return matchesSearch && matchesFilter
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("BDT", "৳")
  }

  return (
    <div className="space-y-6 animate-luxury-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-luxury-primary flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            International Destinations
          </h2>
          <p className="text-luxury-secondary mt-1">Discover premium flight options to your favorite destinations</p>
        </div>
        <Badge className="badge-luxury text-lg px-4 py-2 w-fit">
          <Crown className="h-4 w-4 mr-2" />
          {filteredTickets.length} Destinations Available
        </Badge>
      </div>

      {/* Search and Filter */}
      <Card className="card-luxury">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-muted h-4 w-4" />
              <Input
                placeholder="Search destinations, cities, or airlines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-luxury pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                className={selectedFilter === "all" ? "btn-luxury" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                All
              </Button>
              <Button
                variant={selectedFilter === "popular" ? "default" : "outline"}
                onClick={() => setSelectedFilter("popular")}
                className={selectedFilter === "popular" ? "btn-luxury" : ""}
              >
                <Star className="h-4 w-4 mr-2" />
                Popular
              </Button>
              <Button
                variant={selectedFilter === "luxury" ? "default" : "outline"}
                onClick={() => setSelectedFilter("luxury")}
                className={selectedFilter === "luxury" ? "btn-luxury" : ""}
              >
                <Crown className="h-4 w-4 mr-2" />
                Luxury
              </Button>
              <Button
                variant={selectedFilter === "budget" ? "default" : "outline"}
                onClick={() => setSelectedFilter("budget")}
                className={selectedFilter === "budget" ? "btn-luxury" : ""}
              >
                Budget
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTickets.map((ticket, index) => (
          <Card
            key={ticket.id}
            className="card-luxury group cursor-pointer animate-luxury-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{ticket.flag}</div>
                  <div>
                    <CardTitle className="text-luxury-primary text-lg">{ticket.country}</CardTitle>
                    <CardDescription className="text-luxury-muted flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {ticket.city}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {ticket.popular && (
                    <Badge variant="secondary" className="text-xs px-2 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {ticket.luxury && (
                    <Badge className="badge-luxury text-xs px-2 py-1">
                      <Crown className="h-3 w-3 mr-1" />
                      Luxury
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Price */}
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{formatPrice(ticket.price)}</div>
                <div className="text-sm text-luxury-muted">per person</div>
              </div>

              {/* Flight Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-luxury-muted">Airline:</span>
                  <span className="text-luxury-secondary font-medium">{ticket.airline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-luxury-muted">Duration:</span>
                  <span className="text-luxury-secondary">{ticket.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-luxury-muted">Stops:</span>
                  <span className="text-luxury-secondary">
                    {ticket.stops === 0 ? "Direct" : `${ticket.stops} stop${ticket.stops > 1 ? "s" : ""}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-luxury-muted">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-luxury-secondary font-medium">{ticket.rating}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button className="btn-luxury flex-1" size="sm">
                  <Plane className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
                <Button variant="outline" size="sm" className="px-3 bg-transparent">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTickets.length === 0 && (
        <Card className="card-luxury">
          <CardContent className="text-center py-12">
            <Globe className="h-16 w-16 text-luxury-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-luxury-primary mb-2">No destinations found</h3>
            <p className="text-luxury-muted mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedFilter("all")
              }}
              className="btn-luxury"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-luxury">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{countryTickets.filter((t) => t.popular).length}</div>
            <div className="text-sm text-luxury-muted">Popular Routes</div>
          </CardContent>
        </Card>
        <Card className="card-luxury">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{countryTickets.filter((t) => t.luxury).length}</div>
            <div className="text-sm text-luxury-muted">Luxury Options</div>
          </CardContent>
        </Card>
        <Card className="card-luxury">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{countryTickets.filter((t) => t.stops === 0).length}</div>
            <div className="text-sm text-luxury-muted">Direct Flights</div>
          </CardContent>
        </Card>
        <Card className="card-luxury">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              ৳{Math.min(...countryTickets.map((t) => t.price)).toLocaleString()}
            </div>
            <div className="text-sm text-luxury-muted">Starting From</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
