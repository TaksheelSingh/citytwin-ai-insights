
import React from 'react';
import AirQualityDashboard from '@/components/air-quality/AirQualityDashboard';
import AppLayout from '@/components/layout/AppLayout';

const AirQuality = () => {
  return (
    <AppLayout>
      <AirQualityDashboard />
    </AppLayout>
  );
};

export default AirQuality;