import React from 'react';
import { useNavigate } from 'react-router';
import bgImage from '../assets/webp_background.jpg';
import logo from '../assets/logo.svg';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-screen flex"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Left — branding */}
      <div className="flex-1 flex flex-col justify-center px-16">
        <h1
          className="text-7xl font-bold tracking-wide mb-4 text-center"
          style={{color: '#ffffff'}}
        >
          Serene
        </h1>
        <p
          className="text-xl tracking-widest uppercase text-center"
          style={{color: '#ffffff'}}
        >
          Find your place of relaxation
        </p>
      </div>

      {/* Right — side panel */}
      <div
        className="flex flex-col justify-center px-12 py-16 min-h-screen gap-3"
        style={{
          position: 'relative',
          width: '42%',
          backgroundColor: 'rgba(13, 26, 28, 0.88)',
          backdropFilter: 'blur(6px)',
          borderLeft: '1px solid var(--boba-deep-teal)',
        }}
      >
        <img
          src={logo}
          alt="Serene logo"
          style={{ alignSelf: 'center', width: '120px', height: '120px', marginBottom: '0.5rem' }}
        />
        <h2
          className="text-2xl font-semibold mb-2 text-center"
          style={{color: '#ffffff'}}
        >
          Welcome back
        </h2>
        <p
          className="text-sm mb-16 text-center"
          style={{color: '#ffffff'}}
        >
          Select how you'd like to continue
        </p>

        <div className="flex flex-col gap-4 ">
          <button
            onClick={() => navigate('/customer')}
            className="w-full py-4 text-base font-semibold rounded-lg transition-all"
            style={{
              backgroundColor: 'var(--boba-teal)',
              color: '#ffffff',
              border: '1px solid var(--boba-mid-teal)',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--boba-mid-teal-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--boba-teal)')}
          >
            Customer Mode
          </button>

          <button
            onClick={() => navigate('/employee')}
            className="w-full py-4 text-base font-semibold rounded-lg transition-all"
            style={{
              backgroundColor: 'var(--boba-blue-green)',
              color: '#ffffff',
              border: '1px solid var(--boba-blue-green-hover)',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--boba-blue-green-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--boba-blue-green)')}
          >
            Employee Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;