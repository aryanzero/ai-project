import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="p-4 text-center">
          <h2 className="text-red-600">Something went wrong.</h2>
          <details className="text-sm mt-2">
            {this.state.errorInfo ? this.state.errorInfo.componentStack : "No error details available"}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
