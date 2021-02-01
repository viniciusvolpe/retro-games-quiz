import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const SpinnerContainer = styled.div`
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Circle = styled.span`
    width: 100%;
    height: 100%;
    border: 0.5rem solid ${({ theme }) => theme.colors.primary};
    border-top: 0.5rem solid ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    box-sizing: border-box;
`;

export default function Spinner({ size }) {
  return (
    <SpinnerContainer size={size}>
      <Circle
        as={motion.span}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, loop: 100 }}
      />
    </SpinnerContainer>
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 100,
};
