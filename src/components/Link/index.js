import PropTypes from 'prop-types';
import NextLink from 'next/link';

function Link({ children, ...props }) {
  return (
    <NextLink {...props}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>{children}</a>
    </NextLink>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Link;
