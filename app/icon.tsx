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
          borderRadius: '8px',
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
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#ffc837"
          style={{
            filter: 'drop-shadow(0px 0px 4px rgba(255, 153, 0, 0.9))',
          }}
        >
          <path d="M11.767 19.089c4.924.868 6.14-2.205 5.237-4.436-.71-1.758-2.618-2.128-2.618-2.128s1.583-.606 2.053-2.316c.553-2.015-.81-3.666-4.52-3.082l.334-1.327-1.127-.284-.328 1.303c-.297-.07-.601-.133-.906-.195l.33-1.31-1.127-.283-.334 1.326c-.244-.055-.487-.11-.725-.168l-1.555-.391-.3 1.202s.837.192.82.205c.457.114.54.37.525.586l-.888 3.535c.023.006.053.018.086.035l-.088-.022-1.246 4.96c-.056.136-.184.341-.482.268.018.012-.82-.205-.82-.205l-.561 1.29 1.467.368c.273.069.544.135.812.198l-.337 1.346 1.126.282.333-1.327c.308.083.61.16.908.23l-.333 1.326 1.127.283.337-1.34c1.884.357 3.298.214 3.905-.815.489-.83.364-1.85-.18-2.585.836-.37 1.365-1.107 1.183-2.339zM11.23 8.878c1.373-.344 2.222.186 2.052.868-.17.682-1.178 1.002-2.551 1.347l.564-2.25c-.065.035-.065.035-.065.035zm-.935 3.731l.654-2.607c1.644-.412 2.659.13 2.455.948-.205.818-1.398 1.188-3.042 1.6l-.067.059z" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
