import classnames from 'classnames';

import styles from './styles.module.scss';

const Well = function Well(props) {
  const {
    children,
    className,
    ...restProps
  } = props;

  return (
    <div
      className={classnames(
        styles.container,
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Well;
