/* eslint-disable functional/no-class */
/* eslint-disable functional/no-this-expression */
import React from 'react';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    const { rollbar } = this.props;
    this.setState({ hasError: true });
    rollbar.log(error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorIndicator />;
    }

    return children;
  }
}
