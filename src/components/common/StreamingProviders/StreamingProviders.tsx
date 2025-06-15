import React from "react";
import { motion } from "framer-motion";
import "./StreamingProviders.scss";

interface StreamingProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface StreamingProvidersProps {
  providers: StreamingProvider[];
  title: string | React.ReactNode;
}

const StreamingProviders: React.FC<StreamingProvidersProps> = ({
  providers,
  title,
}) => {
  if (!providers || providers.length === 0) {
    return (
      <div className="streaming-providers">
        {title || <h2>Where to Watch</h2>}
        <p className="no-providers">Not available for streaming</p>
      </div>
    );
  }

  return (
    <div className="streaming-providers">
      {title || <h2>Where to Watch</h2>}
      <div className="providers-grid">
        {providers.map((provider) => (
          <motion.div
            key={provider.provider_id}
            className="provider-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <img
              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              alt={provider.provider_name}
              loading="lazy"
            />
            <span className="provider-name">{provider.provider_name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StreamingProviders;
