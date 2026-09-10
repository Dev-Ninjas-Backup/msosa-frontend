import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import Button from "@/common/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <img
            src="https://illustrations.popsy.co/gray/policeman-looking-at-clues.svg"
            alt="Page not found illustration"
            className="w-full h-auto max-h-[300px] mx-auto"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
        </div>

        <div className="space-y-3">
          <h1 className="text-6xl sm:text-8xl font-black text-gray-200">404</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Lost in Space?
          </h2>
          <p className="text-gray-500 max-w-xs mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved
            to another coordinate.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            variant="secondary"
            className="bg-gray-900 text-white hover:bg-gray-800 border-0"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
