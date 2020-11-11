import { React } from './singletonDependencies';

const propsMapper = mapTo => WrappedComponent => {
  const HOC = props => {
    const newProps = mapTo(props);
    return <WrappedComponent {...props} {...newProps} />;
  };
  return HOC;
};

export default propsMapper;
