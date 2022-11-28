import classnames from 'classnames';

import styles from './styles.module.scss';

const Placeholder = function Placeholder(props) {
  const {
    className,
    children,
    ...restProps
  } = props;

  return (
    <div
      className={classnames(
        styles.container,
        className,
        styles.gradient,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Placeholder;
