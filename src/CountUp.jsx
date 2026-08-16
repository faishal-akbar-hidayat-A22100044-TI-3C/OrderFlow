import { useEffect, useRef, useState } from "react";
import { animate } from "motion";

function CountUp({
  from = 0,
  to = 100,
  duration = 1.5,
  prefix = "",
}) {
  const [value, setValue] = useState(from);
  const numberRef = useRef(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        numberRef.current = latest;
        setValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [from, to, duration]);

  return (
    <span>
      {prefix}
      {value.toLocaleString("id-ID")}
    </span>
  );
}

export default CountUp;