import React from "react";
import { motion } from "framer-motion";
import "./TrailerPreview.scss";

interface TrailerPreviewProps {
  videoKey: string;
}

const TrailerPreview: React.FC<TrailerPreviewProps> = ({ videoKey }) => {
  return (
    <motion.div
      className="trailer-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoKey}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  );
};

export default TrailerPreview;
