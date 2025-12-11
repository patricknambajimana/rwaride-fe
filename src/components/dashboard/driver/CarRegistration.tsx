import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Alert, AlertDescription } from "../../ui/alert";
import { Upload, Check, AlertCircle } from "lucide-react";

interface CarInfo {
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  color: string;
  vin: string;
  seatsAvailable: string;
}

interface DocumentUpload {
  registrationCert: File | null;
  insuranceCert: File | null;
  inspection: File | null;
}

interface CarRegistrationProps {
  onSuccess?: (carData: CarInfo & DocumentUpload) => void;
  onCancel?: () => void;
}

export function CarRegistration({ onSuccess, onCancel }: CarRegistrationProps) {
  const [step, setStep] = useState<"info" | "documents" | "confirmation">("info");
  const [carInfo, setCarInfo] = useState<CarInfo>({
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    licensePlate: "",
    color: "",
    vin: "",
    seatsAvailable: "4",
  });

  const [documents, setDocuments] = useState<DocumentUpload>({
    registrationCert: null,
    insuranceCert: null,
    inspection: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const carMakes = [
    "Toyota",
    "Nissan",
    "Hyundai",
    "Kia",
    "Honda",
    "Volkswagen",
    "Ford",
    "BMW",
    "Mercedes",
    "Audi",
    "Mazda",
    "Mitsubishi",
    "Suzuki",
    "Other",
  ];

  const colors = [
    "White",
    "Black",
    "Gray",
    "Silver",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Brown",
    "Orange",
  ];

  const validateCarInfo = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!carInfo.make) newErrors.make = "Vehicle make is required";
    if (!carInfo.model) newErrors.model = "Vehicle model is required";
    if (!carInfo.year) newErrors.year = "Year is required";
    if (!carInfo.licensePlate) newErrors.licensePlate = "License plate is required";
    if (!carInfo.color) newErrors.color = "Color is required";
    if (!carInfo.vin || carInfo.vin.length < 17)
      newErrors.vin = "Valid VIN (17 characters) is required";
    if (!carInfo.seatsAvailable || parseInt(carInfo.seatsAvailable) < 2)
      newErrors.seatsAvailable = "Must have at least 2 available seats";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDocuments = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!documents.registrationCert)
      newErrors.registrationCert = "Vehicle registration certificate is required";
    if (!documents.insuranceCert)
      newErrors.insuranceCert = "Insurance certificate is required";
    if (!documents.inspection)
      newErrors.inspection = "Vehicle inspection certificate is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCarInfoChange = (field: keyof CarInfo, value: string) => {
    setCarInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (field: keyof DocumentUpload, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (step === "info") {
      if (validateCarInfo()) {
        setStep("documents");
      }
    } else if (step === "documents") {
      if (validateDocuments()) {
        setStep("confirmation");
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Car Registration Data:", { carInfo, documents });

      if (onSuccess) {
        onSuccess({ ...carInfo, ...documents });
      }

      // Success state
      setStep("confirmation");
    } catch (error) {
      console.error("Error registering car:", error);
      setErrors({ submit: "Failed to register car. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-2">
          <CardHeader className="text-center bg-linear-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Register Your Vehicle</CardTitle>
            <CardDescription className="text-green-50">
              Complete your vehicle registration to start offering rides
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {/* Step Indicator */}
            <div className="flex justify-between mb-8">
              <div className="flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step === "info" || step === "documents" || step === "confirmation"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  1
                </div>
                <p className="text-sm text-center mt-2">Vehicle Info</p>
              </div>
              <div className="flex-1 border-t-2 border-gray-300 mt-5" />
              <div className="flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step === "documents" || step === "confirmation"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <p className="text-sm text-center mt-2">Documents</p>
              </div>
              <div className="flex-1 border-t-2 border-gray-300 mt-5" />
              <div className="flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step === "confirmation"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
                <p className="text-sm text-center mt-2">Confirmation</p>
              </div>
            </div>

            {/* Step 1: Vehicle Information */}
            {step === "info" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make">Vehicle Make *</Label>
                    <Select value={carInfo.make} onValueChange={(val) => handleCarInfoChange("make", val)}>
                      <SelectTrigger id="make">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {carMakes.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
                  </div>

                  <div>
                    <Label htmlFor="model">Vehicle Model *</Label>
                    <Input
                      id="model"
                      placeholder="e.g., Corolla, Altima"
                      value={carInfo.model}
                      onChange={(e) => handleCarInfoChange("model", e.target.value)}
                    />
                    {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      type="number"
                      min="1990"
                      max={new Date().getFullYear()}
                      value={carInfo.year}
                      onChange={(e) => handleCarInfoChange("year", e.target.value)}
                    />
                    {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                  </div>

                  <div>
                    <Label htmlFor="color">Color *</Label>
                    <Select value={carInfo.color} onValueChange={(val) => handleCarInfoChange("color", val)}>
                      <SelectTrigger id="color">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="licensePlate">License Plate *</Label>
                  <Input
                    id="licensePlate"
                    placeholder="e.g., RAJ 123A"
                    value={carInfo.licensePlate}
                    onChange={(e) =>
                      handleCarInfoChange("licensePlate", e.target.value.toUpperCase())
                    }
                  />
                  {errors.licensePlate && <p className="text-red-500 text-sm mt-1">{errors.licensePlate}</p>}
                </div>

                <div>
                  <Label htmlFor="vin">Vehicle Identification Number (VIN) *</Label>
                  <Input
                    id="vin"
                    placeholder="17-character VIN"
                    value={carInfo.vin}
                    onChange={(e) => handleCarInfoChange("vin", e.target.value.toUpperCase())}
                    maxLength={17}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Found on dashboard or vehicle registration
                  </p>
                  {errors.vin && <p className="text-red-500 text-sm mt-1">{errors.vin}</p>}
                </div>

                <div>
                  <Label htmlFor="seats">Available Seats *</Label>
                  <Select
                    value={carInfo.seatsAvailable}
                    onValueChange={(val) => handleCarInfoChange("seatsAvailable", val)}
                  >
                    <SelectTrigger id="seats">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 3, 4, 5, 6, 7].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} seats
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.seatsAvailable && (
                    <p className="text-red-500 text-sm mt-1">{errors.seatsAvailable}</p>
                  )}
                </div>

                {errors.submit && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">{errors.submit}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Step 2: Document Upload */}
            {step === "documents" && (
              <div className="space-y-6">
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Please upload clear copies (PDF or JPG) of all required documents
                  </AlertDescription>
                </Alert>

                <div>
                  <Label>Vehicle Registration Certificate *</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("registrationCert", e.target.files?.[0] || null)}
                      className="hidden"
                      id="registration"
                    />
                    <label htmlFor="registration" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="font-medium text-gray-700">
                        {documents.registrationCert
                          ? documents.registrationCert.name
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-gray-500">PDF, JPG, PNG up to 5MB</p>
                    </label>
                  </div>
                  {errors.registrationCert && (
                    <p className="text-red-500 text-sm mt-1">{errors.registrationCert}</p>
                  )}
                </div>

                <div>
                  <Label>Insurance Certificate *</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("insuranceCert", e.target.files?.[0] || null)}
                      className="hidden"
                      id="insurance"
                    />
                    <label htmlFor="insurance" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="font-medium text-gray-700">
                        {documents.insuranceCert
                          ? documents.insuranceCert.name
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-gray-500">PDF, JPG, PNG up to 5MB</p>
                    </label>
                  </div>
                  {errors.insuranceCert && (
                    <p className="text-red-500 text-sm mt-1">{errors.insuranceCert}</p>
                  )}
                </div>

                <div>
                  <Label>Vehicle Inspection Certificate *</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("inspection", e.target.files?.[0] || null)}
                      className="hidden"
                      id="inspection"
                    />
                    <label htmlFor="inspection" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="font-medium text-gray-700">
                        {documents.inspection
                          ? documents.inspection.name
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-gray-500">PDF, JPG, PNG up to 5MB</p>
                    </label>
                  </div>
                  {errors.inspection && (
                    <p className="text-red-500 text-sm mt-1">{errors.inspection}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === "confirmation" && (
              <div className="space-y-6">
                <Alert className="border-green-200 bg-green-50">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    All documents received and under review. You'll be notified once verification is complete.
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <h3 className="font-bold text-lg">Registration Summary</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Vehicle</p>
                      <p className="font-medium">
                        {carInfo.year} {carInfo.make} {carInfo.model}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">License Plate</p>
                      <p className="font-medium">{carInfo.licensePlate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Color</p>
                      <p className="font-medium">{carInfo.color}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Available Seats</p>
                      <p className="font-medium">{carInfo.seatsAvailable}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Uploaded Documents</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{documents.registrationCert?.name || "Registration Certificate"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{documents.insuranceCert?.name || "Insurance Certificate"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{documents.inspection?.name || "Inspection Certificate"}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    Verification typically takes 24-48 hours. You can start creating trips once approved.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (step === "documents") setStep("info");
                  else if (step === "confirmation" && onCancel) onCancel();
                }}
                disabled={step === "info" && loading}
              >
                {step === "confirmation" ? "Close" : "Back"}
              </Button>

              {step !== "confirmation" && (
                <Button
                  onClick={step === "documents" ? handleSubmit : handleNext}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Processing..." : step === "documents" ? "Submit Registration" : "Next"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
