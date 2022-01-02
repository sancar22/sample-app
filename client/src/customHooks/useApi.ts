import {useEffect, useState} from 'react';

export default function useApi <ResponseType, ErrorType> (url: string): [ResponseType | null, ErrorType | null] {
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    setResponse(null);
    setError(null);
    const fetchData = async () => {
      try { 
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
      } catch (e: any) {
        setError(e);
      }

      return () => {
        console.log('Unmounted!');
      };
    };
    fetchData();
  }, []);
  
  return [response, error];
}