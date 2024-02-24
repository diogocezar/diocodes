import * as React from "react";

interface EmailAvaliationProps {
  firstName: string;
}

export const EmailAvaliation: React.FC<Readonly<EmailAvaliationProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
