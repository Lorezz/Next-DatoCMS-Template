import { createContext } from 'react';
import { assign, Machine } from 'xstate';
import _ from 'lodash';

import * as api from './api';

const fetchAll = async (bearer) => {
  const responses = await Promise.all([
    api.getPosts(bearer),
    api.getUsers(bearer),
    api.getReports(bearer),
    api.getFlags(bearer)
  ]);

  const merge = responses.reduce((all, resp) => {
    const { data } = resp;
    return { ...all, ...data };
  }, {});

  console.log('MERGED DATA', merge);
  return merge;
};

const fetchData = async (context, event) => {
  const bearer = context.user.token;
  console.log('FETCH DATA');
  return await fetchAll(bearer);
};

const doLogin = async (context, event) => {
  const { values } = event;
  const response = await api.signIn({ data: values });
  const user = _.get(response, 'data.signIn.user', null);
  console.log('USER', user);
  return user;
};

const doLogout = async (context, event) => {
  const bearer = context.user.token;
  const response = await api.signOut({ data: {} }, bearer);
  console.log('logout response', response);
  return undefined;
};

const reportAction = async (context, event) => {
  console.log('reportAction');
  const bearer = context.user.token;
  const { action } = event;
  const { type, data } = action;
  console.log('action', action);

  let p = api[type];
  const response = await p({ data }, bearer);
  const report = _.get(response, 'data', null);
  console.log('report', report);
  return await fetchAll(bearer);
  // return context.data;
};

const isAuthError = (context, event) => {
  const { error } = context;
  console.log('error', error);
  return error === '401' || error === 401;
};

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
          // reportings: [],
          // posts: [],
          // users: [],
          // flags: [],
        },
    states: {
      init: {},
      auth: {
        states: {
          login: {
            invoke: {
              id: 'doLogin',
              src: doLogin,
              onDone: {
                target: 'success',
                actions: assign({
                  user: (context, event) => event.data,
                  loading: false
                })
              },
              onError: {
                target: 'fail',
                actions: assign({
                  error: (context, event) => event.data,
                  loading: false
                })
              }
            }
          },
          success: {},
          fail: {
            always: [
              {
                EVENT: '^logout',
                cond: isAuthError,
                actions: assign({ error: () => null })
              }
            ]
          }
        }
      },
      logout: {
        initial: 'notify',
        states: {
          notify: {
            invoke: {
              id: 'doLogout',
              src: doLogout,
              onDone: {
                target: 'success',
                actions: assign({
                  user: (context, event) => event.data,
                  loading: false
                })
              },
              onError: {
                target: 'fail',
                actions: assign({
                  error: (context, event) => event.data,
                  loading: false
                })
              }
            }
          },
          success: {},
          fail: {}
        }
      },

      list: {
        states: {
          loading: {
            invoke: {
              id: 'fetchData',
              src: fetchData,
              onDone: {
                target: 'success',
                actions: assign({
                  data: (context, event) => event.data,
                  loading: false
                })
              },
              onError: {
                target: 'fail',
                actions: assign({
                  error: (context, event) => event.data,
                  loading: false
                })
              }
            }
          },
          success: {},
          fail: {}
        }
      },

      report_action: {
        initial: 'loading',
        states: {
          loading: {
            invoke: {
              id: 'report_action',
              src: reportAction,
              onDone: {
                target: 'success',
                actions: assign({
                  data: (context, event) => event.data,
                  loading: false
                })
              },
              onError: {
                target: 'fail',
                actions: assign({
                  error: (context, event) => event.data,
                  loading: false
                })
              }
            }
          },
          success: {},
          fail: {}
        }
      },

      detail: {
        states: {
          selected: {}
        }
      }
    },
    on: {
      LOGIN: {
        target: 'auth.login',
        actions: assign({ loading: () => true, error: () => null })
      },
      LOGOUT: {
        target: 'logout',
        actions: assign({ loading: () => true, error: () => null })
      },
      FETCH: {
        target: 'list.loading',
        actions: assign({ loading: () => true, error: () => null })
      },
      REPORT_ACTION: {
        target: 'report_action',
        actions: assign({
          loading: () => true,
          error: () => null,
          action: (context, event) => event.action
        })
      }
    }
  });
}

// export const MachineContext = createContext();
export default createAppMachine;

// export function createAppMachine(fetchData) {
//   export const fetchMachine = Machine(
//     {
//       id: 'fetch',
//       initial: 'idle',
//       context: {
//         results: null,
//         message: ''
//       },
//       states: {
//         idle: {
//           on: {
//             FETCH: 'pending'
//           }
//         },
//         pending: {
//           invoke: {
//             src: 'fetchData',
//             onDone: { target: 'successful', actions: ['setResults'] },
//             onError: { target: 'failed', actions: ['setMessage'] }
//           }
//         },
//         failed: {
//           on: {
//             FETCH: 'pending'
//           }
//         },
//         successful: {
//           type: 'final',
//           data: {
//             result: (context, event) => context.results,
//             error: (context, event) => context.message
//           }
//         }
//       }
//     },
//     {
//       actions: {
//         setResults: assign((ctx, event) => ({
//           results: event.data
//         })),
//         setMessage: assign((ctx, event) => ({
//           message: event.data
//         }))
//       }
//     }
//   );
// }
