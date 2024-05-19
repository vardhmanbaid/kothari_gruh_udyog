/* eslint-disable sonarjs/no-duplicated-branches */ // Remove this rule when you set the withScope
// import { captureEvent, captureException, captureMessage, withScope } from '@sentry/react';

export const log = (type: string, payload: any) => {
  if (type === 'info') {
    console.log(payload);
    // withScope((scope) => {
    //   scope.setLevel('info');
    //   captureMessage(payload);
    // });
  } else if (type === 'error') {
    console.log(payload);
    // withScope((scope) => {
    //   scope.setLevel('error');
    //   captureException(payload);
    // });
  } else if (type === 'event') {
    console.log(payload);
    // const event = {
    //   message: payload.eventName,
    //   level: 'info',
    //   extra: payload.extraData,
    // };
    // captureEvent(event);
  }
};
