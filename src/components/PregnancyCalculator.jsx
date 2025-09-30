import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Baby, Calendar, Heart, Share2, Copy, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { differenceInDays, differenceInWeeks, addDays, format } from 'date-fns'

const PregnancyCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState('')
  const [currentWeek, setCurrentWeek] = useState(0)
  const [currentDay, setCurrentDay] = useState(0)
  const [dueDate, setDueDate] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [trimester, setTrimester] = useState(1)

  const calculatePregnancy = () => {
    if (!lastPeriod) return

    const lmpDate = new Date(lastPeriod)
    const today = new Date()
    
    // Calculate weeks and days pregnant
    const daysSinceLMP = differenceInDays(today, lmpDate)
    const weeks = Math.floor(daysSinceLMP / 7)
    const days = daysSinceLMP % 7
    
    // Calculate due date (280 days from LMP)
    const calculatedDueDate = addDays(lmpDate, 280)
    
    // Determine trimester
    let currentTrimester = 1
    if (weeks >= 28) currentTrimester = 3
    else if (weeks >= 14) currentTrimester = 2
    
    setCurrentWeek(weeks)
    setCurrentDay(days)
    setDueDate(calculatedDueDate)
    setTrimester(currentTrimester)
    setShowResult(true)
  }

  const getWeekDescription = (week) => {
    if (week < 4) return "Early development stage"
    if (week < 8) return "Embryonic period"
    if (week < 12) return "First trimester"
    if (week < 24) return "Second trimester"
    if (week < 37) return "Third trimester"
    if (week < 42) return "Full term"
    return "Post-term"
  }

  const getMilestone = (week) => {
    const milestones = {
      4: "Heart begins to beat",
      8: "All major organs formed",
      12: "End of first trimester",
      16: "Gender can be determined",
      20: "Halfway point reached",
      24: "Viability milestone",
      28: "Third trimester begins",
      32: "Rapid brain development",
      36: "Considered full-term soon",
      40: "Due date reached!"
    }
    
    for (let w = week; w >= 0; w--) {
      if (milestones[w]) return milestones[w]
    }
    return "Beginning of pregnancy journey"
  }

  const shareResult = (platform) => {
    const text = `I'm ${currentWeek} weeks and ${currentDay} days pregnant! Due date: ${format(dueDate, 'MMMM dd, yyyy')} 💕`
    const url = window.location.href
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${text} - ${url}`)
    }
  }

  const progressPercentage = Math.min((currentWeek / 40) * 100, 100)

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
            <Baby className="w-12 h-12 text-pink-400 mr-4" />
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pregnancy Calculator
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your pregnancy journey and calculate your due date based on your last menstrual period
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="pregnancy-card rounded-2xl border p-8 shadow-2xl">
              <h2 className="font-semibold text-xl mb-6 text-purple-700">
                Enter Your Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-purple-600">
                    Last Menstrual Period (LMP)
                  </label>
                  <Input
                    type="date"
                    value={lastPeriod}
                    onChange={(e) => setLastPeriod(e.target.value)}
                    className="input-glow text-purple-700 border-purple-200 focus:border-purple-400"
                    max={format(new Date(), 'yyyy-MM-dd')}
                  />
                  <p className="text-xs text-purple-500 mt-2">
                    Select the first day of your last menstrual period
                  </p>
                </div>

                <Button
                  onClick={calculatePregnancy}
                  disabled={!lastPeriod}
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 text-lg"
                  size="lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Calculate Pregnancy
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
            <div className="pregnancy-card rounded-2xl border p-8 shadow-2xl">
              <h2 className="font-semibold text-xl mb-6 text-purple-700">
                Your Pregnancy Journey
              </h2>
              
              <AnimatePresence>
                {showResult ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="space-y-6"
                  >
                    {/* Current Week Display */}
                    <div className="text-center">
                      <motion.div
                        className="text-5xl font-bold font-orbitron text-purple-600 mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      >
                        {currentWeek}w {currentDay}d
                      </motion.div>
                      <div className="text-purple-500 text-sm">weeks and days pregnant</div>
                      <div className="text-purple-600 font-semibold mt-2">
                        {getWeekDescription(currentWeek)}
                      </div>
                    </div>

                    {/* Progress Timeline */}
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-purple-600">
                        <span>Progress</span>
                        <span>{progressPercentage.toFixed(0)}% Complete</span>
                      </div>
                      <div className="w-full bg-purple-100 rounded-full h-4 overflow-hidden">
                        <motion.div
                          className="pregnancy-progress h-4 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-purple-500">
                        <span>0 weeks</span>
                        <span>20 weeks</span>
                        <span>40 weeks</span>
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-purple-600 font-medium">Estimated Due Date</div>
                          <div className="text-lg font-semibold text-purple-700">
                            {format(dueDate, 'MMMM dd, yyyy')}
                          </div>
                        </div>
                        <Calendar className="w-8 h-8 text-purple-400" />
                      </div>
                    </div>

                    {/* Trimester Info */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-purple-600 font-medium">Current Trimester</div>
                          <div className="text-lg font-semibold text-purple-700">
                            {trimester === 1 ? 'First' : trimester === 2 ? 'Second' : 'Third'} Trimester
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {trimester}
                        </div>
                      </div>
                    </div>

                    {/* Milestone */}
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-purple-200">
                      <div className="text-sm text-purple-600 font-medium mb-1">Current Milestone</div>
                      <div className="text-purple-700 font-semibold">
                        {getMilestone(currentWeek)}
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="space-y-2 pt-4">
                      <Button
                        onClick={() => shareResult('twitter')}
                        className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white flex items-center justify-center space-x-2"
                        size="sm"
                      >
                        <Twitter className="w-4 h-4" />
                        <span>Share on Twitter</span>
                      </Button>
                      <Button
                        onClick={() => shareResult('copy')}
                        variant="outline"
                        className="w-full flex items-center justify-center space-x-2 border-purple-200 text-purple-600 hover:bg-purple-50"
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
                    className="text-center text-purple-400 py-12"
                  >
                    <Baby className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Enter your last menstrual period date to calculate your pregnancy timeline</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Information Cards */}
        {showResult && (
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              {
                title: "Prenatal Care",
                description: "Regular checkups are important for monitoring your baby's development",
                icon: Heart
              },
              {
                title: "Healthy Diet",
                description: "Maintain a balanced diet with essential nutrients for you and your baby",
                icon: Baby
              },
              {
                title: "Stay Active",
                description: "Light exercise can help with pregnancy symptoms and prepare for delivery",
                icon: Calendar
              }
            ].map((tip, index) => {
              const Icon = tip.icon
              return (
                <motion.div
                  key={index}
                  className="pregnancy-card rounded-xl border p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Icon className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="font-semibold text-purple-700 mb-2">{tip.title}</h3>
                  <p className="text-purple-600 text-sm">{tip.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PregnancyCalculator
