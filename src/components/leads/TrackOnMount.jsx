"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function TrackOnMount({ event, payload }) {
  useEffect(() => {
    track(event, payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
