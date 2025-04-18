// components/Accordion.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

export function Accordion({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item: { question: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; answer: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
        <motion.div
          key={index}
          className="border rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className="p-6 cursor-pointer flex justify-between items-center bg-gray-50"
            whileHover={{ backgroundColor: '#f3f4f6' }}
          >
            <h3 className="text-lg font-semibold">{item.question}</h3>
            <ChevronDown className="h-5 w-5 text-gray-600" />
          </motion.div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-6"
            >
              <p className="text-gray-600">{item.answer}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}