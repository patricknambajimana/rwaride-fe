import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface JoinRwaRideProps {
  onGetStarted: () => void;
}

export function JoinRwaRide({ onGetStarted }: JoinRwaRideProps) {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-linear-to-br from-green-500 to-blue-600 text-white border-0 shadow-2xl">
            <CardContent className="p-4">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Join RwaRide Today</h3>
                <p className="text-green-100 text-lg">
                  Be part of Rwanda's transportation revolution
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">No hidden fees</p>
                    <p className="text-sm text-green-100">Transparent pricing for every trip</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">24/7 Support</p>
                    <p className="text-sm text-green-100">Customer service always available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Verified Drivers</p>
                    <p className="text-sm text-green-100">All drivers pass background checks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Flexible Scheduling</p>
                    <p className="text-sm text-green-100">Book rides anytime, anywhere</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={onGetStarted} 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-6"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
