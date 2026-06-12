import { useEffect, useState } from "react";

/** Tamaño de la nube de iconos según el ancho de pantalla. */
export function useIconCloudSize() {
  const [size, setSize] = useState(280);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 360) setSize(200);
      else if (width < 480) setSize(230);
      else if (width < 640) setSize(250);
      else if (width < 1024) setSize(270);
      else setSize(280);
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
