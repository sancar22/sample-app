import {useEffect} from 'react';

export default function useUpdateLogger <T> (state: T) {
  useEffect(() => {
    console.log(state);
  }, [state]);
}