import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, GraduationCap, Share2, Copy, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const GPACalculator = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: '', grade: '', credits: '' }
  ])
  const [gpa, setGpa] = useState(0)
  const [totalCredits, setTotalCredits] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  }

  const addCourse = () => {
    const newId = Math.max(...courses.map(c => c.id)) + 1
    setCourses([...courses, { id: newId, name: '', grade: '', credits: '' }])
  }

  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id))
    }
  }

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ))
  }

  const calculateGPA = () => {
    let totalPoints = 0
    let totalCreds = 0
    
    courses.forEach(course => {
      if (course.grade && course.credits) {
        const points = gradePoints[course.grade] || 0
        const credits = parseFloat(course.credits) || 0
        totalPoints += points * credits
        totalCreds += credits
      }
    })
    
    const calculatedGPA = totalCreds > 0 ? totalPoints / totalCreds : 0
    setGpa(calculatedGPA)
    setTotalCredits(totalCreds)
    setShowResult(true)
  }

  const getGPAColor = (gpa) => {
    if (gpa >= 3.7) return 'text-green-400'
    if (gpa >= 3.0) return 'text-blue-400'
    if (gpa >= 2.0) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getGPALabel = (gpa) => {
    if (gpa >= 3.7) return 'Excellent'
    if (gpa >= 3.0) return 'Good'
    if (gpa >= 2.0) return 'Satisfactory'
    return 'Needs Improvement'
  }

  const shareResult = (platform) => {
    const text = `I calculated my GPA using CalcVerse! My GPA is ${gpa.toFixed(2)}/4.0 (${getGPALabel(gpa)})`
    const url = window.location.href
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${text} - ${url}`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
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
            <GraduationCap className="w-12 h-12 text-primary mr-4" />
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GPA Calculator
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Calculate your Grade Point Average by entering your courses, grades, and credit hours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Entry Form */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-card rounded-2xl border border-border p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-xl">Course Information</h2>
                <Button
                  onClick={addCourse}
                  className="btn-primary flex items-center space-x-2"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Course</span>
                </Button>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -100 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-muted/20 rounded-xl border border-border/50"
                    >
                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium mb-2">
                          Course Name
                        </label>
                        <Input
                          placeholder="e.g., Calculus I"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          className="input-glow"
                        />
                      </div>
                      
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium mb-2">
                          Grade
                        </label>
                        <Select
                          value={course.grade}
                          onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                        >
                          <SelectTrigger className="input-glow">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(gradePoints).map(grade => (
                              <SelectItem key={grade} value={grade}>
                                {grade} ({gradePoints[grade]})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium mb-2">
                          Credits
                        </label>
                        <Input
                          type="number"
                          placeholder="3"
                          min="0"
                          max="10"
                          step="0.5"
                          value={course.credits}
                          onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                          className="input-glow"
                        />
                      </div>
                      
                      <div className="md:col-span-1 flex items-end">
                        <Button
                          onClick={() => removeCourse(course.id)}
                          variant="outline"
                          size="sm"
                          className="w-full md:w-auto text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          disabled={courses.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <Button
                onClick={calculateGPA}
                className="w-full mt-6 btn-primary text-lg py-3"
                size="lg"
              >
                Calculate GPA
              </Button>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl border border-border p-6 shadow-2xl sticky top-24">
              <h2 className="font-semibold text-xl mb-6">Your GPA</h2>
              
              <AnimatePresence>
                {showResult ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    <div className="mb-6">
                      <motion.div
                        className={`text-6xl font-bold font-orbitron ${getGPAColor(gpa)} mb-2`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      >
                        {gpa.toFixed(2)}
                      </motion.div>
                      <div className="text-muted-foreground text-sm">out of 4.0</div>
                      <div className={`text-lg font-semibold ${getGPAColor(gpa)} mt-2`}>
                        {getGPALabel(gpa)}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Progress</span>
                        <span>{((gpa / 4.0) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <motion.div
                          className="progress-bar h-3"
                          initial={{ width: 0 }}
                          animate={{ width: `${(gpa / 4.0) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Credits:</span>
                        <span className="font-semibold">{totalCredits}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Courses:</span>
                        <span className="font-semibold">{courses.filter(c => c.grade && c.credits).length}</span>
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="space-y-2">
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
                    <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Enter your courses and click "Calculate GPA" to see your results</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default GPACalculator
