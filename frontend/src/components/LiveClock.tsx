import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock-card">
      <Clock size={18} />
      <div>
        <strong>
          {now.toLocaleTimeString("de-CH", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </strong>
        <span>
          {now.toLocaleDateString("de-CH", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
