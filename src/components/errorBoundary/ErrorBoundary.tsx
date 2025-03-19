import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
          <h2 className="text-2xl font-semibold text-red-600">
            Something went wrong.
          </h2>
          <p className="text-lg text-gray-700 mt-2">
            {this.state.error?.message ||
              "An unknown error occurred. Please try again later."}
          </p>
          <Button
            onClick={this.handleReset}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Try Again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
