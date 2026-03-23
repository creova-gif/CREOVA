import { Calendar, MapPin, Clock, Users, Ticket } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CartItem } from '../../App';

type EventsPageProps = {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
};

export function EventsPage({ addToCart }: EventsPageProps) {
  const events = [
    {
      id: 'workshop-portrait',
      name: 'Portrait Photography Workshop',
      date: 'March 15, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'CREOVA Studio, Niagara',
      price: 150,
      spots: 12,
      category: 'Workshop',
      description: 'Learn professional portrait lighting, posing, and editing techniques in this hands-on workshop.',
      image: 'https://images.unsplash.com/photo-1624233657776-ee72bd72e460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMHdvbWFuJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2NTU2NDc0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['6 hours of instruction', 'Lunch provided', 'Lighting equipment access', 'Model included', 'Certificate of completion']
    },
    {
      id: 'networking-creatives',
      name: 'BIPOC Creatives Networking Night',
      date: 'March 22, 2025',
      time: '6:00 PM - 9:00 PM',
      location: 'The Studio, Toronto',
      price: 25,
      spots: 50,
      category: 'Networking',
      description: 'Connect with fellow BIPOC photographers, videographers, designers, and entrepreneurs.',
      image: 'https://images.unsplash.com/photo-1575409119177-091ad482531a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMHByb2Zlc3Npb25hbHMlMjBuZXR3b3JraW5nJTIwcGFydHl8ZW58MXx8fHwxNzY1NTY0NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['Light refreshments', 'Portfolio review opportunities', 'Collaborative space', 'DJ & music']
    },
    {
      id: 'workshop-product',
      name: 'Product Photography Masterclass',
      date: 'April 5, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'CREOVA Studio, Niagara',
      price: 120,
      spots: 10,
      category: 'Workshop',
      description: 'Master flat-lays, styling, and lighting for e-commerce and social media.',
      image: 'https://images.unsplash.com/photo-1655325673452-4cabf9f2a85e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBmbGF0JTIwbGF5JTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NTU2NDc0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['4-hour intensive', 'Props & backdrops provided', 'Styling tips', 'Editing walkthrough', 'Digital resource pack']
    },
    {
      id: 'showcase-bipoc',
      name: 'BIPOC Artist Showcase & Gallery Opening',
      date: 'April 18, 2025',
      time: '7:00 PM - 11:00 PM',
      location: 'Gallery 44, Toronto',
      price: 35,
      spots: 100,
      category: 'Exhibition',
      description: 'Celebrate Black and BIPOC visual artists with an evening of art, music, and culture.',
      image: 'https://images.unsplash.com/photo-1547322617-3f783b07f999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMGFydGlzdCUyMGdhbGxlcnklMjBleGhpYml0aW9uJTIwb3BlbmluZ3xlbnwxfHx8fDE3NjU1NjQ3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['Gallery admission', 'Artist meet & greet', 'Live performances', 'Complimentary drink', 'Silent auction access']
    },
    {
      id: 'workshop-video',
      name: 'Cinematic Video Editing Workshop',
      date: 'May 10, 2025',
      time: '10:00 AM - 3:00 PM',
      location: 'Online via Zoom',
      price: 89,
      spots: 25,
      category: 'Workshop',
      description: 'Learn color grading, transitions, and storytelling in Premiere Pro and DaVinci Resolve.',
      image: 'https://images.unsplash.com/photo-1492619193369-af2352531443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjB3b3Jrc3BhY2UlMjBjb21wdXRlciUyMHNjcmVlbnxlbnwxfHx8fDE3NjU1NjQ3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['5-hour live session', 'Screen recording', 'Project files', 'LUT pack included', 'Q&A session']
    },
    {
      id: 'retreat-creative',
      name: 'Creative Retreat Weekend',
      date: 'June 14-16, 2025',
      time: 'Friday 5 PM - Sunday 2 PM',
      location: 'Muskoka, Ontario',
      price: 450,
      spots: 20,
      category: 'Retreat',
      description: 'A weekend immersion for creatives to recharge, collaborate, and create in nature.',
      image: 'https://images.unsplash.com/photo-1755549746560-c9f1343bbf0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHJldHJlYXQlMjBuYXR1cmUlMjB3b3Jrc2hvcCUyMG91dGRvb3J8ZW58MXx8fHwxNzY1NTY0NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['2 nights accommodation', 'All meals included', 'Photography excursions', 'Yoga & wellness', 'Creative workshops', 'Community bonfire']
    },
    {
      id: 'panel-discussion',
      name: 'Building Your Creative Business Panel',
      date: 'May 25, 2025',
      time: '2:00 PM - 4:30 PM',
      location: 'Innovation Hub, Hamilton',
      price: 15,
      spots: 75,
      category: 'Panel',
      description: 'Industry pros share insights on pricing, marketing, and scaling your creative business.',
      image: 'https://images.unsplash.com/photo-1573497701240-345a300b8d36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMGJ1c2luZXNzJTIwcGFuZWwlMjBkaXNjdXNzaW9uJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTU2NDc1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['Panel discussion', 'Q&A session', 'Networking time', 'Resource booklet']
    },
    {
      id: 'photowalk-toronto',
      name: 'Urban Photography Walk - Toronto',
      date: 'April 12, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'Distillery District, Toronto',
      price: 35,
      spots: 15,
      category: 'Photo Walk',
      description: 'Guided photography walk through Toronto\'s most photogenic neighborhoods.',
      image: 'https://images.unsplash.com/photo-1760662720282-eb2031a68eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjB3YWxraW5nJTIwdXJiYW4lMjBzdHJlZXQlMjBUb3JvbnRvfGVufDF8fHx8MTc2NTU2NDc1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['3-hour guided walk', 'Location scouting tips', 'Group critique', 'Coffee break included']
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Community Events</Badge>
          <h1 className="text-4xl md:text-5xl mb-4">Events & Workshops</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our creative community. Learn new skills, network with fellow artists, 
            and celebrate BIPOC culture through workshops, showcases, and gatherings.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge>{event.category}</Badge>
                </div>
                {event.spots <= 10 && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive">Only {event.spots} spots left</Badge>
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600">{event.description}</p>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{event.spots} spots available</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="mb-2">Includes:</p>
                  <ul className="space-y-1">
                    {event.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl">${event.price}</span>
                    <p className="text-gray-600">per ticket</p>
                  </div>
                  <Button
                    onClick={() => addToCart({
                      id: event.id,
                      name: event.name,
                      price: event.price,
                      type: 'ticket'
                    })}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Buy Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-black text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl mb-4">Want to Host an Event with CREOVA?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We partner with organizations, brands, and community groups to create impactful events. 
            Let's collaborate on your next workshop, showcase, or gathering.
          </p>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            Contact Us About Partnerships
          </Button>
        </div>
      </div>
    </div>
  );
}