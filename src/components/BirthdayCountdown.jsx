import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Gift, PartyPopper, Share2, Copy, Twitter, Cake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import confetti from 'canvas-confetti'

const BirthdayCountdown = () => {
  const [birthdate, setBirthdate] = useState('')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [nextBirthday, setNextBirthday] = useState(null)
  const [age, setAge] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isBirthdayToday, setIsBirthdayToday] = useState(false)

  useEffect(() => {
    let interval = null
    if (showResult && nextBirthday) {
      interval = setInterval(() => {
        const now = new Date().getTime()
        const distance = nextBirthday.getTime() - now

        if (distance > 0) {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          })
        } else {
          // Birthday has arrived!
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          setIsBirthdayToday(true)
          triggerConfetti()
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [showResult, nextBirthday])

  const calculateCountdown = () => {
    if (!birthdate) return

    const birth = new Date(birthdate)
    const today = new Date()
    
    // Calculate age
    let calculatedAge = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      calculatedAge--
    }

    // Calculate next birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    
    // If birthday has passed this year, set it to next year
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1)
      calculatedAge++
    }

    // Check if today is the birthday
    const isToday = today.getDate() === birth.getDate() && 
                   today.getMonth() === birth.getMonth()

    setAge(calculatedAge)
    setNextBirthday(nextBday)
    setIsBirthdayToday(isToday)
    setShowResult(true)

    if (isToday) {
      triggerConfetti()
    }
  }

  const triggerConfetti = () => {
    // Multiple confetti bursts
    const duration = 3000
    const end = Date.now() + duration

    const colors = ['#00d4ff', '#8b5cf6', '#14b8a6', '#f59e0b', '#ef4444']

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  const shareResult = (platform) => {
    const text = isBirthdayToday 
      ? `🎉 It's my birthday today! I'm turning ${age}! 🎂`
      : `⏰ ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes until my ${age}th birthday! 🎂`
    const url = window.location.href
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${text} - ${url}`)
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
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
            <Cake className="w-12 h-12 text-primary mr-4" />
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Birthday Countdown
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Count down to your next birthday with precision timing and celebrate with style
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
              <h2 className="font-semibold text-xl mb-6">Enter Your Birthday</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Your Birth Date
                  </label>
                  <Input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="input-glow"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Select your birth date to calculate the countdown
                  </p>
                </div>

                <Button
                  onClick={calculateCountdown}
                  disabled={!birthdate}
                  className="w-full btn-primary text-lg py-3"
                  size="lg"
                >
                  <PartyPopper className="w-5 h-5 mr-2" />
                  Start Countdown
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
              <h2 className="font-semibold text-xl mb-6">Countdown Timer</h2>
              
              <AnimatePresence>
                {showResult ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="space-y-6"
                  >
                    {isBirthdayToday ? (
                      <motion.div
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <div className="text-6xl mb-4">🎉</div>
                        <div className="text-4xl font-bold font-orbitron text-primary mb-2">
                          Happy Birthday!
                        </div>
                        <div className="text-xl text-muted-foreground mb-4">
                          You're turning {age} today!
                        </div>
                        <motion.div
                          className="text-2xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          🎂🎈🎁
                        </motion.div>
                      </motion.div>
                    ) : (
                      <>
                        {/* Countdown Display */}
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: 'Days', value: timeLeft.days, color: 'text-primary' },
                            { label: 'Hours', value: timeLeft.hours, color: 'text-accent' },
                            { label: 'Minutes', value: timeLeft.minutes, color: 'text-green-400' },
                            { label: 'Seconds', value: timeLeft.seconds, color: 'text-yellow-400' }
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              className="text-center p-4 bg-muted/20 rounded-xl border border-border/50"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                              <motion.div
                                className={`text-3xl font-bold font-orbitron ${item.color} count-up`}
                                key={item.value}
                              >
                                {item.value.toString().padStart(2, '0')}
                              </motion.div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {item.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Next Birthday Info */}
                        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground font-medium">Next Birthday</div>
                              <div className="text-lg font-semibold">
                                {formatDate(nextBirthday)}
                              </div>
                              <div className="text-sm text-primary font-medium">
                                You'll be {age} years old
                              </div>
                            </div>
                            <Gift className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                      </>
                    )}

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
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Enter your birth date to start the countdown to your next birthday</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Fun Facts Section */}
        {showResult && !isBirthdayToday && (
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              {
                title: "Days Lived",
                value: Math.floor((new Date() - new Date(birthdate)) / (1000 * 60 * 60 * 24)),
                suffix: "days",
                icon: Calendar
              },
              {
                title: "Hours Until Birthday",
                value: timeLeft.days * 24 + timeLeft.hours,
                suffix: "hours",
                icon: PartyPopper
              },
              {
                title: "Current Age",
                value: age - 1,
                suffix: "years old",
                icon: Cake
              }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className="bg-card rounded-xl border border-border p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold font-orbitron text-primary mb-1">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.suffix}</div>
                  <div className="text-lg font-semibold mt-2">{stat.title}</div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default BirthdayCountdown
