// src/pages/Home.jsx
import React from 'react';
import Layout from '../layout';
import Header from '../components/Header';
import Lectures from '../components/Lectures';
import TeacherHeroSection from '../components/TeacherDashboardHeroSection';

const Home = () => {
  return (
    <Layout>
      <Header />
      <TeacherHeroSection />
      <Lectures />
    </Layout>
  );
};

export default Home;
