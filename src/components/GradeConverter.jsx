import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Percent, Globe, Award, Share2, Copy, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const GradeConverter = () => {
  const [percentage, setPercentage] = useState('')
  const [country, setCountry] = useState('US')
  const [letterGrade, setLetterGrade] = useState('')
  const [gradeDescription, setGradeDescription] = useState('')
  const [showResult, setShowResult] = useState(false)

  const gradingSystems = {
    US: {
      name: 'United States',
      grades: [
        { min: 97, max: 100, letter: 'A+', description: 'Excellent', color: 'grade-a' },
        { min: 93, max: 96, letter: 'A', description: 'Excellent', color: 'grade-a' },
        { min: 90, max: 92, letter: 'A-', description: 'Very Good', color: 'grade-a' },
        { min: 87, max: 89, letter: 'B+', description: 'Good', color: 'grade-b' },
        { min: 83, max: 86, letter: 'B', description: 'Good', color: 'grade-b' },
        { min: 80, max: 82, letter: 'B-', description: 'Above Average', color: 'grade-b' },
        { min: 77, max: 79, letter: 'C+', description: 'Average', color: 'grade-c' },
        { min: 73, max: 76, letter: 'C', description: 'Average', color: 'grade-c' },
        { min: 70, max: 72, letter: 'C-', description: 'Below Average', color: 'grade-c' },
        { min: 67, max: 69, letter: 'D+', description: 'Poor', color: 'grade-d' },
        { min: 65, max: 66, letter: 'D', description: 'Poor', color: 'grade-d' },
        { min: 0, max: 64, letter: 'F', description: 'Fail', color: 'grade-f' }
      ]
    },
    UK: {
      name: 'United Kingdom',
      grades: [
        { min: 70, max: 100, letter: 'First', description: 'First Class Honours', color: 'grade-a' },
        { min: 60, max: 69, letter: '2:1', description: 'Upper Second Class', color: 'grade-b' },
        { min: 50, max: 59, letter: '2:2', description: 'Lower Second Class', color: 'grade-c' },
        { min: 40, max: 49, letter: 'Third', description: 'Third Class Honours', color: 'grade-d' },
        { min: 0, max: 39, letter: 'Fail', description: 'Fail', color: 'grade-f' }
      ]
    },
    Canada: {
      name: 'Canada',
      grades: [
        { min: 90, max: 100, letter: 'A+', description: 'Excellent', color: 'grade-a' },
        { min: 85, max: 89, letter: 'A', description: 'Excellent', color: 'grade-a' },
        { min: 80, max: 84, letter: 'A-', description: 'Very Good', color: 'grade-a' },
        { min: 77, max: 79, letter: 'B+', description: 'Good', color: 'grade-b' },
        { min: 73, max: 76, letter: 'B', description: 'Good', color: 'grade-b' },
        { min: 70, max: 72, letter: 'B-', description: 'Above Average', color: 'grade-b' },
        { min: 67, max: 69, letter: 'C+', description: 'Average', color: 'grade-c' },
        { min: 63, max: 66, letter: 'C', description: 'Average', color: 'grade-c' },
        { min: 60, max: 62, letter: 'C-', description: 'Below Average', color: 'grade-c' },
        { min: 57, max: 59, letter: 'D+', description: 'Poor', color: 'grade-d' },
        { min: 53, max: 56, letter: 'D', description: 'Poor', color: 'grade-d' },
        { min: 50, max: 52, letter: 'D-', description: 'Minimal Pass', color: 'grade-d' },
        { min: 0, max: 49, letter: 'F', description: 'Fail', color: 'grade-f' }
      ]
    },
    India: {
      name: 'India',
      grades: [
        { min: 91, max: 100, letter: 'A1', description: 'Outstanding', color: 'grade-a' },
        { min: 81, max: 90, letter: 'A2', description: 'Excellent', color: 'grade-a' },
        { min: 71, max: 80, letter: 'B1', description: 'Very Good', color: 'grade-b' },
        { min: 61, max: 70, letter: 'B2', description: 'Good', color: 'grade-b' },
        { min: 51, max: 60, letter: 'C1', description: 'Above Average', color: 'grade-c' },
        { min: 41, max: 50, letter: 'C2', description: 'Average', color: 'grade-c' },
        { min: 33, max: 40, letter: 'D', description: 'Below Average', color: 'grade-d' },
        { min: 21, max: 32, letter: 'E1', description: 'Poor', color: 'grade-f' },
        { min: 0, max: 20, letter: 'E2', description: 'Very Poor', color: 'grade-f' }
      ]
    }
  }

  const convertGrade = () => {
    if (!percentage || percentage < 0 || percentage > 100) return

    const system = gradingSystems[country]
    const grade = system.grades.find(g => 
      parseFloat(percentage) >= g.min && parseFloat(percentage) <= g.max
    )

    if (grade) {
      setLetterGrade(grade.letter)
      setGradeDescription(grade.description)
      setShowResult(true)
    }
  }

  const getGradeColor = () => {
    if (!showResult) return ''
    const system = gradingSystems[country]
    const grade = system.grades.find(g => 
      parseFloat(percentage) >= g.min && parseFloat(percentage) <= g.max
    )
    return grade ? grade.color : ''
  }

  const shareResult = (platform) => {
    const text = `I got ${percentage}% which is a ${letterGrade} (${gradeDescription}) in the ${gradingSystems[country].name} grading system!`
    const url = window.location.href
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${text} - ${url}`)
    }
  }

  const getGradeAdvice = () => {
    const numPercentage = parseFloat(percentage)
    if (numPercentage >= 90) return "Outstanding performance! Keep up the excellent work!"
    if (numPercentage >= 80) return "Great job! You're performing very well."
    if (numPercentage >= 70) return "Good work! There's room for improvement."
    if (numPercentage >= 60) return "You're on the right track. Consider additional study."
    if (numPercentage >= 50) return "You're passing, but focus on strengthening weak areas."
    return "Consider seeking additional help and dedicating more study time."
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Percent className="w-12 h-12 text-primary mr-4" />
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Grade Converter
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Convert percentage grades to letter grades across different international grading systems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-2xl border border-border p-8 shadow-2xl">
              <h2 className="font-semibold text-xl mb-6">Enter Grade Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Percentage Score
                  </label>
                  <Input
                    type="number"
                    placeholder="85"
                    min="0"
                    max="100"
                    step="0.1"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="input-glow text-2xl font-semibold text-center"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter a percentage between 0 and 100
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Grading System
                  </label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="input-glow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(gradingSystems).map(([code, system]) => (
                        <SelectItem key={code} value={code}>
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4" />
                            <span>{system.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={convertGrade}
                  disabled={!percentage || percentage < 0 || percentage > 100}
                  className="w-full btn-primary text-lg py-3"
                  size="lg"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Convert Grade
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl border border-border p-8 shadow-2xl">
              <h2 className="font-semibold text-xl mb-6">Grade Result</h2>
              
              <AnimatePresence>
                {showResult ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="space-y-6"
                  >
                    {/* Grade Badge */}
                    <div className="text-center">
                      <motion.div
                        className={`inline-block grade-badge text-4xl font-bold font-orbitron mb-4 ${getGradeColor()}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      >
                        {letterGrade}
                      </motion.div>
                      <div className="text-xl font-semibold mb-2">{gradeDescription}</div>
                      <div className="text-muted-foreground">
                        {percentage}% in {gradingSystems[country].name} system
                      </div>
                    </div>

                    {/* Grade Breakdown */}
                    <div className="bg-muted/20 rounded-xl p-4 border border-border/50">
                      <h3 className="font-semibold mb-3">Grade Breakdown</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Percentage:</span>
                          <span className="font-semibold">{percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Letter Grade:</span>
                          <span className="font-semibold">{letterGrade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Description:</span>
                          <span className="font-semibold">{gradeDescription}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">System:</span>
                          <span className="font-semibold">{gradingSystems[country].name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Advice */}
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
                      <h3 className="font-semibold mb-2 text-primary">Performance Advice</h3>
                      <p className="text-sm text-muted-foreground">
                        {getGradeAdvice()}
                      </p>
                    </div>

                    {/* Share Buttons */}
                    <div className="space-y-2 pt-4">
                      <Button
                        onClick={() => shareResult('twitter')}
                        className="w-full btn-secondary flex items-center justify-center space-x-2"
                        size="sm"
                      >
                        <Twitter className="w-4 h-4" />
                        <span>Share on Twitter</span>
                      </Button>
                      <Button
                        onClick={() => shareResult('copy')}
                        variant="outline"
                        className="w-full flex items-center justify-center space-x-2"
                        size="sm"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <Percent className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Enter your percentage and select a grading system to convert your grade</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Grading System Reference */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-card rounded-2xl border border-border p-8 shadow-2xl">
            <h2 className="font-semibold text-xl mb-6">
              {gradingSystems[country].name} Grading Scale
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gradingSystems[country].grades.map((grade, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl border ${grade.color} flex items-center justify-between`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
                >
                  <div>
                    <div className="font-bold text-lg">{grade.letter}</div>
                    <div className="text-sm opacity-90">{grade.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {grade.min === grade.max ? grade.min : `${grade.min}-${grade.max}`}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GradeConverter
