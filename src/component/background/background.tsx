import React from 'react';


interface BackgroundProps {
  children?: React.ReactNode; 
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('./img/qweqwe.jpg')" }}>
      <div className="relative flex justify-center items-center h-full">
        {children}
      </div>
    </div>
  );
}

export default Background;
