import { useRouter } from 'next/router';
import * as React from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Component = props => {
    const router = useRouter();
    const jwtToken = (typeof localStorage !== 'undefined' && localStorage.getItem('token')) || null;
    const isNoAccess = React.useMemo(() => {
      return !jwtToken;
    }, [jwtToken]);

    React.useEffect(() => {
      if (isNoAccess) {
        router.replace('/login');
      } else if (jwtToken) {
        router.replace('/');
      }
    }, [isNoAccess, jwtToken]);

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAuth;
