// import Calculator from '@/components/pages/abTesting/Calculator';
// import AboutSeo from '@/components/pages/home/AboutSeo';
import Banner from '@/components/pages/home/Banner';
import FAQ from '@/components/pages/home/FAQ';
import Tools from '@/components/pages/home/Tools';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Banner />
      {/* <AboutSeo /> */}
      <Tools />
      <FAQ/>
    </div>
  );
};

export default Home;