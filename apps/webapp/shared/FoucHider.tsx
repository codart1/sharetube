import { useEffect, useState } from 'react';
import { Video } from 'tabler-icons-react';

export default function FoucHider() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const i = setInterval(() => {
      const styleLoaded = !!document.querySelector('[data-emotion=mantine]');
      if (styleLoaded) {
        clearInterval(i);
        setShow(false);
      }
    }, 100);
  }, []);

  return show ? (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: '#e8efff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Video color="#4d78ff" size={42} />
    </div>
  ) : null;
}
