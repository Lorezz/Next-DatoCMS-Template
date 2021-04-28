import { createContext, useState, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import dynamic from 'next/dynamic';

import createAppMachine from 'lib/state';
import useLocalStorage from 'lib/useLocalStorage';

const StateContext = createContext();

function StateProvider({ children }) {
  const [persistedState, setPersistedState] = useLocalStorage('nextflag', null);
  // const [state, send, service] = useMachine(createAppMachine(persistedState));
  const [state, send, service] = useMachine(createAppMachine());
  useEffect(() => {
    const subscription = service.subscribe((state) => {
      // console.log('STATE++', state);
      setPersistedState(state.context);
    });
    return subscription.unsubscribe;
  }, [service]);

  return (
    <StateContext.Provider value={[state, send]}>
      {children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };
