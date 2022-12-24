import { useRouter } from 'next/router';
import * as React from 'react';
import decode from 'jwt-decode';

const withAuthAdmin = (WrappedComponent: React.ComponentType, route: string) => {
  const Component = props => {
    const router = useRouter();
    const jwtToken = (typeof localStorage !== 'undefined' && localStorage.getItem('token')) || null;
    // const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    // const decodedToken: { exp: number } = jwtToken && decode(jwtToken);
    // const dateNow = new Date();

    let isAdmin = false;

    try {
      const { userToken }: any = decode(jwtToken);

      if (userToken.level === 'Admin') {
        // setIsAdmin(true);
        isAdmin = true;
      }
    } catch (error) {
      isAdmin = false;
      console.log(error);
      // setIsAdmin(false);
    }

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
      } else if (jwtToken && isAdmin) {
        router.replace(`/${route}`);
      } else if (jwtToken) {
        router.replace('/');
      }
    }, [isNoAccess, jwtToken]);

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAuthAdmin;
