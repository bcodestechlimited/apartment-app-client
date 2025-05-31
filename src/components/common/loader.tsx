import React from "react";

interface LoaderProps {
  color?: string;
  isLoading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  color = "black",
  isLoading = true,
}) => {
  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`w-8 h-8 border-4 border-t-transparent animate-spin rounded-full`}
        style={{
          borderColor: `${color} transparent ${color} transparent`,
        }}
      ></div>
    </div>
  );
};

const AuthLoader: React.FC<LoaderProps> = ({
  color = "blue",
  isLoading = true,
}) => {
  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center py-6">
      <div
        className={`w-10 h-10 border-4 border-t-transparent animate-spin rounded-full`}
        style={{
          borderColor: `${color} transparent ${color} transparent`,
        }}
      ></div>
    </div>
  );
};

const Spinner: React.FC<LoaderProps> = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div
      className={`mr-2 w-4 h-4 border-2  border-t-transparent border-b-transparent border-custom-primary animate-spin rounded-full inline-block`}
    ></div>
  );
};

export { Loader, AuthLoader, Spinner };
