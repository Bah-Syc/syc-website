@@ .. @@
 import React, { useState } from 'react';
+import { supabase } from './lib/supabase';
 import { 
   Bot, 
@@ .. @@
 function App() {
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     businessNeeds: ''
   });
+  const [isSubmitting, setIsSubmitting] = useState(false);
+  const [submitMessage, setSubmitMessage] = useState('');
 
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
@@ .. @@
     });
   };
 
-  const handleSubmit = (e: React.FormEvent) => {
+  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
-    console.log('Form submitted:', formData);
-    // Handle form submission logic here
+    setIsSubmitting(true);
+    setSubmitMessage('');
+
+    try {
+      const { error } = await supabase
+        .from('consultations')
+        .insert([
+          {
+            name: formData.name,
+            email: formData.email,
+            business_needs: formData.businessNeeds,
+          }
+        ]);
+
+      if (error) {
+        throw error;
+      }
+
+      setSubmitMessage('Thank you! Your consultation request has been submitted successfully. We\'ll get back to you soon.');
+      setFormData({ name: '', email: '', businessNeeds: '' });
+    } catch (error) {
+      console.error('Error submitting consultation:', error);
+      setSubmitMessage('Sorry, there was an error submitting your request. Please try again.');
+    } finally {
+      setIsSubmitting(false);
+    }
   };
 
   return (
@@ .. @@
             </div>
             
             <div className="text-center pt-4">
+              {submitMessage && (
+                <div className={`mb-6 p-4 rounded-xl ${
+                  submitMessage.includes('Thank you') 
+                    ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
+                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
+                }`}>
+                  {submitMessage}
+                </div>
+              )}
               <button
                 type="submit"
-                className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
+                disabled={isSubmitting}
+                className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
               >
                 <span className="relative z-10 flex items-center gap-3">
-                  Schedule Consultation
-                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
+                  {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
+                  {!isSubmitting && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               </button>