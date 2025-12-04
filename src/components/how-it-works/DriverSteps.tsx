import { Card, CardContent } from '../ui/card';

export function DriverSteps() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">How It Works for Drivers</h3>
            <p className="text-gray-600">Start earning by sharing your daily commute</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Create Trip</h4>
                <p className="text-sm text-gray-600">Post your route and schedule</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Get Bookings</h4>
                <p className="text-sm text-gray-600">Receive passenger requests</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Pick Up</h4>
                <p className="text-sm text-gray-600">Navigate to passenger location</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  4
                </div>
                <h4 className="font-semibold mb-2">Earn Money</h4>
                <p className="text-sm text-gray-600">Complete trip and get paid</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
