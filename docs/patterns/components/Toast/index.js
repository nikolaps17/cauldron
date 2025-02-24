import React, { Component } from 'react';
import { Button, Toast, Link } from '@deque/cauldron-react';
import DemoComponent from '../../../Demo';
import { children } from '../../../props';

export default class Demo extends Component {
  state = {
    type: null
  };

  onTriggerClick(type) {
    this.setState({ type });
  }

  onToastDismiss = dismissed => {
    const { type } = this.state;

    if (dismissed !== type) {
      return;
    }

    this.setState({ type: null }, () => {
      const trigger = this[type];

      if (!trigger) {
        return;
      }

      // return focus back to the dismissed toast's trigger
      trigger.focus();
    });
  };

  render() {
    const { type } = this.state;

    return (
      <DemoComponent
        component={Toast}
        componentDescription={
          'A banner with text positioned at the top of the page.'
        }
        states={[
          {
            type: 'confirmation',
            children: 'Your toast is ready!',
            show: type === 'confirmation',
            onDismiss: () => this.onToastDismiss('confirmation'),
            DEMO_renderAfter: (
              <Button
                onClick={() => this.onTriggerClick('confirmation')}
                buttonRef={el => (this.confirmation = el)}
              >
                Confirmation
              </Button>
            )
          },
          {
            type: 'caution',
            children: 'The toast is getting toasty...',
            onDismiss: () => this.onToastDismiss('caution'),
            show: type === 'caution',
            DEMO_renderAfter: (
              <Button
                variant="secondary"
                onClick={() => this.onTriggerClick('caution')}
                buttonRef={el => (this.caution = el)}
              >
                Caution
              </Button>
            )
          },
          {
            type: 'action-needed',
            children:
              'You burnt the toast! Check yourself before you wreck yourself...',
            show: false,
            DEMO_renderAfter: (
              <Button
                variant="error"
                onClick={() => this.onTriggerClick('action-needed')}
                buttonRef={el => (this['action-needed'] = el)}
              >
                Action Needed
              </Button>
            )
          },
          {
            type: 'info',
            children: 'It is getting toasty in here!',
            show: type === 'info',
            onDismiss: () => this.onToastDismiss('info'),
            DEMO_renderAfter: (
              <Button
                variant="secondary"
                onClick={() => this.onTriggerClick('info')}
                buttonRef={el => (this.info = el)}
              >
                Info
              </Button>
            )
          },
          {
            type: 'error',
            children: 'This toast tastes like toast!',
            show: type === 'error',
            onDismiss: () => this.onToastDismiss('error'),
            DEMO_renderAfter: (
              <Button
                variant="error"
                onClick={() => this.onTriggerClick('error')}
                buttonRef={el => (this.error = el)}
              >
                Error
              </Button>
            )
          },
          {
            type: 'info',
            dismissible: false,
            focus: false,
            children: (
              <>
                This toast is not dismissible by normal means. But you can
                <Link
                  href="#"
                  onClick={() => this.onToastDismiss('not-dismissible')}
                >
                  click me to dismiss this un-dismissible toast.
                </Link>
              </>
            ),
            show: type === 'not-dismissible',
            DEMO_renderAfter: (
              <Button
                variant="error"
                onClick={() => this.onTriggerClick('not-dismissible')}
                buttonRef={el => (this.error = el)}
              >
                Not dismissible
              </Button>
            )
          }
        ]}
        propDocs={{
          children,
          show: {
            type: 'boolean',
            description: 'whether or not to show the toast'
          },
          focus: {
            type: 'boolean',
            description: 'whether or not to focus the toast'
          },
          type: {
            type: 'string',
            required: true,
            description: '"confirmation", "caution", or "action-needed"'
          },
          onDismiss: {
            type: 'function',
            description: 'function to be executed when toast is dismissed'
          },
          dismissText: {
            type: 'string',
            description:
              'text to be added as the aria-label of the "x" dismiss button (default: "Dismiss")'
          },
          dismissible: {
            type: 'boolean',
            description: 'whether or not the user is able to dismiss the toast'
          },
          toastRef: {
            type: 'function',
            description:
              'optional ref function to get a handle on the toast element'
          }
        }}
      >
        <Toast type={'action-needed'} show={type === 'action-needed'}>
          <span>{'You have entered an alternate universe.'}</span>
          <Link href="#" onClick={() => this.onToastDismiss('action-needed')}>
            Go back to non-alternate universe!
          </Link>
        </Toast>
      </DemoComponent>
    );
  }
}
