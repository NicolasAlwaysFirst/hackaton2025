import React from 'react';
const FullLoader = () => {
  const css = `
  .loader {
      height: 15px;
      aspect-ratio: 4;
      --_g: no-repeat radial-gradient(farthest-side,#000 90%,#0000);
      background: 
        var(--_g) left, 
        var(--_g) right;
      background-size: 25% 100%;
      display: flex;
    }
    .loader:before{
      content: "";
      flex: 1;
      background: inherit;
      animation: l50 2s infinite;
    }
    @keyframes l50 {
      0%    {transform: translate( 37.5%) rotate(0)     }
      16.67%{transform: translate( 37.5%) rotate(90deg) }
      33.33%{transform: translate(-37.5%) rotate(90deg) }
      50%   {transform: translate(-37.5%) rotate(180deg)}
      66.67%{transform: translate(-37.5%) rotate(270deg)}
      83.33%{transform: translate( 37.5%) rotate(270deg)}
      100%  {transform: translate( 37.5%) rotate(360deg)}
    }`;
  return (
    <>
    <style>
    {css}
    </style>
   
    <div className="flex justify-center items-center min-h-screen bg-gray-100 opacity-100 fixed top-0 left-0 right-0 bottom-0 z-50">
      <div className="flex items-center space-x-2">
        <div className="loader"></div>
        <span className="text-xl font-semibold text-gray-700"></span>

      </div>
    </div>

    </>
  );
};

export default FullLoader;
