import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #090a18 0%, #13142e 100%)',
          borderRadius: '9px',
          border: '1px solid rgba(247, 151, 30, 0.6)',
          position: 'relative',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(255, 153, 0, 0.35) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            color: '#ffc837',
            fontWeight: 900,
            fontSize: '20px',
            lineHeight: '1',
            fontFamily: 'system-ui, sans-serif',
            textShadow: '0 0 6px rgba(255, 153, 0, 0.9), 0 0 12px rgba(255, 85, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-1px',
          }}
        >
          ₿
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
