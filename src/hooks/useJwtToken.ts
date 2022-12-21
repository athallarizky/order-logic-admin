/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import { useEffect, useMemo, useState } from 'react';
import decode from 'jwt-decode';

export const useJwtToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const _token = (typeof localStorage !== 'undefined' && localStorage.getItem('token')) || null;

  useEffect(() => {
    if (_token) {
      setToken(_token);
      setIsReady(true);
    }
  }, [_token]);

  const decodedToken = useMemo(() => {
    if (token) {
      return decode(token);
    }
  }, [token]);

  return { token, decodedToken, isTokenReady: isReady && token };
};
