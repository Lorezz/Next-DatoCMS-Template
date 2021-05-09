import { Machine } from 'xstate';
import _ from 'lodash';

// import * as api from './api';

function createAppMachine(intialContext = null) {
  return Machine({
    id: 'app',
    initial: 'init',
    context: intialContext
      ? intialContext
      : {
          loading: false,
          error: undefined,
          user: undefined,
          data: null
        },
    states: {
      init: {}
    }
    // on: {}
  });
}

export default createAppMachine;
