import * as React from "react";

interface AvaliationProps {
  firstName: string;
}

export const Avaliation: React.FC<Readonly<AvaliationProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
