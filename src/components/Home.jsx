import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GraduationCap, Baby, Calendar, Percent, ArrowRight, Sparkles } from 'lucide-react'

const Home = () => {
  const calculators = [
    {
      path: '/gpa',
      title: 'GPA Calculator',
      description: 'Calculate your Grade Point Average with course credits and grades',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'shadow-blue-500/25'
    },
    {
      path: '/pregnancy',
      title: 'Pregnancy Calculator',
      description: 'Track pregnancy weeks and estimate due date from last menstrual period',
      icon: Baby,
      color: 'from-pink-500 to-purple-500',
      glowColor: 'shadow-pink-500/25'
    },
    {
      path: '/birthday',
      title: 'Birthday Countdown',
      description: 'Count down to your next birthday with precision timing',
      icon: Calendar,
      color: 'from-green-500 to-teal-500',
      glowColor: 'shadow-green-500/25'
    },
    {
      path: '/grade',
      title: 'Grade Converter',
      description: 'Convert percentage grades to letter grades across different systems',
      icon: Percent,
      color: 'from-orange-500 to-red-500',
      glowColor: 'shadow-orange-500/25'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary mr-3 animate-pulse" />
              <h1 className="font-orbitron text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                CalcVerse
              </h1>
              <Sparkles className="w-8 h-8 text-accent ml-3 animate-pulse delay-500" />
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Your ultimate collection of modern, interactive calculator tools. 
              Designed with a futuristic interface for seamless calculations.
            </p>
            
            <motion.div
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-full text-background font-semibold text-lg shadow-2xl hover:shadow-primary/25 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
              Choose Your Calculator
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each tool is crafted with precision and designed for optimal user experience
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {calculators.map((calc) => {
              const Icon = calc.icon
              return (
                <motion.div
                  key={calc.path}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={calc.path}
                    className="block group"
                  >
                    <div className={`relative p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden ${calc.glowColor} hover:shadow-2xl`}>
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${calc.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <div className={`w-14 h-14 bg-gradient-to-br ${calc.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="font-orbitron text-2xl font-semibold group-hover:text-primary transition-colors">
                            {calc.title}
                          </h3>
                        </div>
                        
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                          {calc.description}
                        </p>
                        
                        <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                          <span>Get Started</span>
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-8">
              Why Choose CalcVerse?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: 'Modern Design',
                  description: 'Sleek, futuristic interface with smooth animations and neon accents'
                },
                {
                  title: 'Instant Results',
                  description: 'Real-time calculations with immediate feedback and visual progress'
                },
                {
                  title: 'Mobile Friendly',
                  description: 'Fully responsive design that works perfectly on all devices'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-card rounded-xl border border-border"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
