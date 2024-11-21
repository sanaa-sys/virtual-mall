import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ThankYouPopup = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                <p className="mb-6">Thank you for submitting your application. We will get back to you shortly.</p>
                <Button onClick={onClose}>Close</Button>
            </motion.div>
        </motion.div>
    );
};

export default ThankYouPopup;