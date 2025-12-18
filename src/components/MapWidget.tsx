'use client';

import { useEffect, useRef } from 'react';

export default function MapWidget() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current && mapContainerRef.current.innerHTML === '') {
      const script = document.createElement('script');
      script.id = 'mapmyvisitors';
      script.src = 'https://mapmyvisitors.com/map.js?cl=ffffff&w=500&t=tt&d=RBWqDb2SCweSNMehaizfBKICw4X9ep74tRMWP17NmMs';
      script.async = true;
      mapContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div 
      ref={mapContainerRef} 
      className="flex justify-center py-8 w-full bg-background"
    />
  );
}