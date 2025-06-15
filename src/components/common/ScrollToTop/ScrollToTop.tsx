import { motion, AnimatePresence } from "framer-motion";
import "./ScrollToTop.scss";

const ScrollToTop = ({
  isVisible,
  scrollToTop,
}: {
  isVisible: boolean;
  scrollToTop: () => void;
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Scroll to top">
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
