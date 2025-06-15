import React, { useState } from "react";
import { motion } from "framer-motion";
import "./VideoSection.scss";

interface VideoSectionProps {
  videoKey: string;
  title: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoKey, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="video-section">
      <div className="video-container">
        {!isPlaying ? (
          <div
            className="video-thumbnail"
            onClick={() => setIsPlaying(true)}
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${videoKey}/maxresdefault.jpg)`,
            }}>
            <div className="play-button">
              <span>▶</span>
            </div>
            <div className="video-title">
              <h3>{title}</h3>
              <p>Click to play trailer</p>
            </div>
          </div>
        ) : (
          <motion.div
            className="video-player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
