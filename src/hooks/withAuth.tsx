import { useRouter } from 'next/router';
import * as React from 'react';
import decode from 'jwt-decode';

const withAuth = (WrappedComponent: React.ComponentType, route = '') => {
  const Component = props => {
    const router = useRouter();
    const jwtToken = (typeof localStorage !== 'undefined' && localStorage.getItem('token')) || null;
    // const decodedToken: { exp: number } = jwtToken && decode(jwtToken);
    // const dateNow = new Date();

    const isNoAccess = React.useMemo(() => {
      return !jwtToken;
    }, [jwtToken]);

    // const isExpired = React.useMemo(() => {
    //   return decodedToken?.exp < dateNow.getTime();
    // }, [jwtToken]);

    // console.log('isExpired', isExpired);

    React.useEffect(() => {
      if (isNoAccess) {
        router.replace('/login');
      }
      // else if (jwtToken) {
      //   router.replace(`/${route}`);
      // }
    }, [isNoAccess, jwtToken]);

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAuth;
