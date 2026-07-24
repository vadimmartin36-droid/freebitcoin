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
          fontSize: 20,
          background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#090a18',
          borderRadius: '7px',
          fontWeight: 900,
          fontFamily: 'sans-serif',
        }}
      >
        ₿
      </div>
    ),
    {
      ...size,
    }
  );
}
