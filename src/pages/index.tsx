import { styled } from '@chakra-ui/react';
import Test from '@src/common/components/Test';

const Home = () => {
  return (
    <div>
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'orange'
        }}
      >
        행인들 (H.I.T)
      </h1>
      <Test />
    </div>
  );
};

export default Home;
