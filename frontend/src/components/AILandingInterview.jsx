import React, { useState, useEffect } from 'react';
import * as emailjs from 'emailjs-com';
import { 
  Sparkles, 
  ChevronRight, 
  Code, 
  Users, 
  Target, 
  Rocket,
 
  Star,
  Play,
  Terminal,
  Shield
} from 'lucide-react';

const CursorTrail = () => {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTrails((prev) => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 5)
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute pointer-events-none"
          style={{
            left: trail.x,
            top: trail.y,
            width: `${4 - index * 0.3}px`,
            height: `${4 - index * 0.3}px`,
            background: `radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
            opacity: 1 - index * 0.1,
            transform: `translate(-50%, -50%) scale(${1 - index * 0.1})`,
            transition: 'all 0.3s ease-out',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
};
const AIInterviewLanding = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState('monthly');
  const [activeFeature, setActiveFeature] = useState(null);
  const [message, setMessage] = useState('');
  const interviewFeatures = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: 'Adaptive Coding Challenges',
      description: 'Intelligent coding problems tailored to your skill level and interview requirements.'
    },
    {
      icon: <Terminal className="w-8 h-8 text-green-400" />,
      title: 'Real-time Code Evaluation',
      description: 'Instant AI-powered feedback on code structure, efficiency, and best practices.'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: 'Collaborative Interview Simulation',
      description: 'Experience realistic interview scenarios with AI-driven interaction and guidance.'
    },
    {
      icon: <Shield className="w-8 h-8 text-red-400" />,
      title: 'Performance Analytics',
      description: 'Comprehensive insights into your interview readiness and skill progression.'
    }
  ];

  const pricingPlans = {
    individual: {
      monthly: [
        {
          title: 'Basic',
          icon: <Target className="w-10 h-10 text-emerald-400" />,
          price: '$20',
          yearlyPrice: '$200',
          quarterlyPrice: '$50',
          features: {
            monthly: [
              'Limited Interview Topics',
              '1 premium credit for 45 min Mock Interview',
              '5 basic credit for 15 min Mock Interview ',
              'Basic Performance Insights',
              'Email Support',
              'Standard AI Feedback'
            ],
            quarterly: [
                'Limited Interview Topics',
                '3 premium credit for 45 min Mock Interview ',
                '20 basic credit for 15 min Mock Interview ',
                'Basic Performance Insights',
                'Email Support',
                'Standard AI Feedback'
            ],
            yearly: [
                'Limited Interview Topics',
                '12 premium credit for 45 min Mock Interview ',
                '70 basic credit for 15 min Mock Interview ',
                'Basic Performance Insights',
                'Email Support',
                'Standard AI Feedback'
            ]
          },
          color: 'emerald',
          recommended: false
        },
        {
          title: 'Pro',
          icon: <Rocket className="w-10 h-10 text-blue-400" />,
          price: '$45',
          yearlyPrice: '$400',
          quarterlyPrice: '$120',
          features: {
            monthly: [
              'All Interview Topics',
              
              '2 premium credit for 45 min Mock Interview ',
              '15 basic credit for 15 min Mock Interview ',
            
              'Email Support',
              'AI Report on Mock Interview'
            ],
            quarterly: [
                'Limited Interview Topics',
                '6 premium credit for 45 min Mock Interview ',
                '50 basic credit for 15 min Mock Interview ',
                'Email Support',
                'AI Report on Mock Interview'
            ],
            yearly: [
                'Limited Interview Topics',
                '25 premium credit for 45 min Mock Interview ',
                '130 basic credit for 15 min Mock Interview ',
                'Email Support',
                'AI Report on Mock Interview'
            ]
          },
          color: 'blue',
          recommended: true
        }
      ]
    }
  };
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan || !email) {
      setMessage('Please select a plan and enter your email.');
      return;
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          plan: selectedPlan,
          email,
          duration,
          message: `You have received a new subscription request.\n\nSender Email: ${email}\nSelected Plan: ${selectedPlan}\nDuration: ${duration}.`
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      setMessage('Thanks for joining the waitlist! We will contact you soon.');
      setEmail('');
      setSelectedPlan(null);
    } catch (error) {
      setMessage('Failed to submit. Please try again.');
      console.error('Waitlist submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      <CursorTrail />
      
      <div className="container mx-auto px-4 pt-32 pb-16 relative">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full 
              bg-gradient-to-r from-blue-500/20 to-purple-500/20 
              backdrop-blur-sm border border-white/10 
              hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 mr-2 text-blue-400 animate-pulse" />
              <span className="text-sm font-medium text-gray-300">MIRA: AI Interview Companion</span>
            </div>

            <h1 className="text-5xl font-bold 
              bg-gradient-to-r from-white via-blue-200 to-blue-500 
              bg-clip-text text-transparent 
              leading-tight">
              MIRA AI : Elevate Your Interview Preparation
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              Transform your technical interview readiness with intelligent, personalized AI-driven mock interviews and skill development.
            </p>

            <div className="flex space-x-4">
              <button className="flex items-center gap-2 px-6 py-3 
                bg-gradient-to-r from-blue-600 to-purple-600 
                rounded-lg hover:scale-105 transition-transform">
                <Play className="w-5 h-5" />
                Start Interview Prep
              </button>
             
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 
              rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                {interviewFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl transition-all duration-300 
                      ${activeFeature === index 
                        ? 'bg-white/10 scale-105 shadow-lg' 
                        : 'bg-white/5 hover:bg-white/10'}
                      cursor-pointer`}
                    onMouseEnter={() => setActiveFeature(index)}
                    onMouseLeave={() => setActiveFeature(null)}
                  >
                    {feature.icon}
                    <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-400 mt-2">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
        <div className="mt-32 text-center">
          <h2 className="text-4xl font-bold mb-6 
            bg-gradient-to-r from-white via-blue-200 to-blue-500 
            bg-clip-text text-transparent">
            Let's Talk! Reach Out for Organizational Use
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Looking to integrate MIRA AI into your organization? Contact us directly for tailored solutions and support.
          </p>
          <button 
            onClick={() => window.location.href = "mailto:arjun.miraai@gmail.com"}
            className="px-6 py-3 rounded-lg 
              bg-gradient-to-r from-green-600 to-blue-600 
              text-white hover:scale-105 transition-transform">
            Let's Talk
          </button>
        </div>
        {/* Pricing Section */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold mb-6 
            bg-gradient-to-r from-white via-blue-200 to-blue-500 
            bg-clip-text text-transparent">
            Flexible Pricing Plans
          </h2>

          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/20 shadow-lg">
              {['monthly', 'quarterly', 'yearly'].map(period => (
                <button 
                  key={period}
                  onClick={() => setDuration(period)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 
                    ${duration === period 
                      ? 'bg-blue-600 text-white shadow-xl' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/10'}`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards (same as previous implementation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pricingPlans.individual[duration === 'monthly' ? 'monthly' : 'monthly'].map((plan, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPlan(plan.title)}
                  className={`relative p-8 rounded-3xl overflow-hidden 
                    ${selectedPlan === plan.title 
                      ? 'ring-4 ring-blue-500/50 scale-105' 
                      : 'hover:scale-105'}
                    bg-gradient-to-br from-${plan.color}-900/30 to-${plan.color}-800/30
                    border border-white/10 
                    shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]
                    cursor-pointer group`}
                >
                  <div className="relative z-10 text-center">
                    {plan.recommended && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-xl text-xs font-bold">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="mb-4 flex justify-center">
                      {plan.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white flex justify-center items-center gap-2">
                      {plan.title}
                      {selectedPlan === plan.title && (
                        <Star className="w-6 h-6 text-blue-400 animate-pulse" />
                      )}
                    </h3>

                    <p className="text-4xl font-bold mb-6 text-blue-300 tracking-tight">
                      {duration === 'monthly' ? plan.price : 
                       duration === 'quarterly' ? plan.quarterlyPrice : 
                       plan.yearlyPrice}
                      <span className="text-sm text-gray-400 ml-2">
                        {duration === 'yearly' ? '/yr' : duration === 'quarterly' ? '/qtr' : '/mo'}
                      </span>
                    </p>

                    <ul className="space-y-4 mb-8 text-left">
                      {plan.features[duration].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300">
                          <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={() => setSelectedPlan(plan.title)}
                      className="w-full py-3 rounded-xl 
                        bg-gradient-to-r from-blue-500 to-purple-500
                        text-white 
                        hover:from-blue-600 hover:to-purple-600
                        transition-all duration-300
                        font-semibold"
                    >
                      {selectedPlan === plan.title ? 'Selected' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              ))}
            </div>



          {/* Waitlist Form */}
          <form 
            onSubmit={handleWaitlistSubmit} 
            className="max-w-lg mx-auto mt-12 bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Join the Waitlist
            </h3>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your professional email"
              required
              className="w-full p-4 mb-6 
                bg-gradient-to-br from-white/10 to-white/5
                rounded-xl 
                border border-white/20 
                focus:outline-none 
                focus:ring-2 focus:ring-blue-500
                text-white
                placeholder-gray-400"
            />
            <button 
              type="submit"
              disabled={!selectedPlan}
              className="w-full py-4 
                bg-gradient-to-r from-blue-500 to-purple-500
                text-white 
                rounded-xl 
                hover:from-blue-600 hover:to-purple-600
                transition-colors 
                font-semibold
                disabled:opacity-50
                flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              Join Waitlist for {selectedPlan} Plan
            </button>
          </form>
          {message && (
            <div 
              className={`mt-6 p-4 rounded-lg text-white 
                ${message.includes('Thanks') 
                  ? 'bg-green-500' 
                  : message.includes('Failed') 
                  ? 'bg-red-500' 
                  : 'bg-blue-500'}`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInterviewLanding;