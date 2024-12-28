import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import resumepdf from '../content/resume/resumefin.pdf';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ResumeProps {
  data: {
    currentRole: string;
    company: string;
    period: string;
  };
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setScale(width / 800); // Adjust 800 based on your desired base width
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-2">{data.currentRole}</h1>
        <p className="text-xl text-zinc-400">{data.company}</p>
        <p className="text-zinc-500">{data.period}</p>
      </motion.header>

      {/* Work Experience Section */}
      <motion.section 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-zinc-200 mb-6">Work Experience</h2>
        <div className="space-y-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="resume-card"
          >
            <h3 className="text-xl font-bold text-zinc-200">Senior Full Stack Developer</h3>
            <p className="text-zinc-400 mb-4">Tech Innovators Inc. | 2022 - Present</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Architected and developed scalable web applications</li>
              <li>Led team of 5 developers in microservices implementation</li>
              <li>Reduced application load time by 40%</li>
              <li>Implemented CI/CD pipelines</li>
            </ul>
          </motion.div>
          {/* Add more work experience cards here */}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-zinc-200 mb-6">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="resume-card">
            <h3 className="text-xl font-bold text-zinc-200 mb-4">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Vue.js</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">Tailwind</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="resume-card">
            <h3 className="text-xl font-bold text-zinc-200 mb-4">Backend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">PostgreSQL</span>
              <span className="skill-tag">MongoDB</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="resume-card">
            <h3 className="text-xl font-bold text-zinc-200 mb-4">DevOps</h3>
            <div className="flex flex-wrap gap-2">
              <span className="skill-tag">AWS</span>
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">CI/CD</span>
              <span className="skill-tag">Git</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-zinc-200 mb-6">Education</h2>
        <div className="space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} className="resume-card">
            <h3 className="text-xl font-bold text-zinc-200">Master of Science in Computer Science</h3>
            <p className="text-zinc-400">Stanford University | 2020</p>
            <p className="text-zinc-500 mt-2">
              Specialization in Software Engineering
              <br />
              GPA: 3.8/4.0
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="resume-card">
            <h3 className="text-xl font-bold text-zinc-200">Bachelor of Science in Computer Engineering</h3>
            <p className="text-zinc-400">MIT | 2018</p>
            <p className="text-zinc-500 mt-2">
              Minor in Mathematics
              <br />
              GPA: 3.9/4.0
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Resume PDF embedded section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-zinc-200 mb-6">Resume PDF</h2>
        <div 
          ref={containerRef}
          className="bg-zinc-800 p-4 rounded-lg shadow-lg overflow-auto"
          style={{ height: '80vh' }}
        >
          <Document
            file={resumepdf}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col items-center"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={scale}
                className="mb-4"
              />
            ))}
          </Document>
        </div>
        <div className="mt-4 flex justify-between items-center text-zinc-300">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Scroll to Top
          </motion.button>
          <p>
            {numPages} Pages
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={resumepdf}
              download="resume.pdf"
              className="inline-block bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Download PDF
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Resume;
