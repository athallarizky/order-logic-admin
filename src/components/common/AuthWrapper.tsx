import React from 'react';

export type AuthWrapperProps = {
  children: React.ReactNode;
};
const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthWrapper;
