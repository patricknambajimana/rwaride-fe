import { Card, CardContent } from '../ui/card';

export function PassengerSteps() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">How It Works for Passengers</h3>
            <p className="text-gray-600">Get to your destination in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-to-br from-green-50 to-white border-2">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h4 className="font-bold text-lg mb-2">Search for Rides</h4>
                <p className="text-gray-600 text-sm">
                  Enter your pickup and destination locations to find available rides
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-blue-50 to-white border-2">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h4 className="font-bold text-lg mb-2">Book & Pay</h4>
                <p className="text-gray-600 text-sm">
                  Choose your preferred driver and complete secure payment
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-white border-2">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h4 className="font-bold text-lg mb-2">Track & Ride</h4>
                <p className="text-gray-600 text-sm">
                  Track your driver in real-time and enjoy a safe journey
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
