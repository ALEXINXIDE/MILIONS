import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Home from './components/Home'
import GPACalculator from './components/GPACalculator'
import PregnancyCalculator from './components/PregnancyCalculator'
import BirthdayCountdown from './components/BirthdayCountdown'
import GradeConverter from './components/GradeConverter'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <motion.main 
          className="pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gpa" element={<GPACalculator />} />
            <Route path="/pregnancy" element={<PregnancyCalculator />} />
            <Route path="/birthday" element={<BirthdayCountdown />} />
            <Route path="/grade" element={<GradeConverter />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  )
}

export default App
