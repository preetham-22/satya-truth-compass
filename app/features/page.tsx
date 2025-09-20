import Link from 'next/link';
import { FaBrain, FaGraduationCap, FaShieldAlt, FaArrowLeft, FaCheck, FaEye, FaDatabase, FaUsers, FaChartLine, FaLightbulb } from 'react-icons/fa';
import Header from '../_components/Header';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Powerful Features for
            <span className="block text-[#1A237E]">Digital Truth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how Satya's advanced AI technology helps you navigate the complex world of digital information with confidence and precision.
          </p>
        </div>
      </section>

      {/* AI-Powered Deconstruction Section */}
      <section id="deconstruction" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#1A237E] p-4 rounded-full mr-4">
                  <FaBrain size={32} color="white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  AI-Powered Deconstruction
                </h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Our advanced machine learning algorithms analyze text, images, and sources to identify potential misinformation and manipulation tactics with unprecedented accuracy.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 flex-shrink-0">
                    <FaEye size={24} color="#1A237E" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Deep Content Analysis</h3>
                    <p className="text-gray-600">Examines linguistic patterns, emotional triggers, and structural elements to detect potential bias and manipulation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaDatabase className="w-6 h-6 text-[#1A237E] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Cross-Reference Verification</h3>
                    <p className="text-gray-600">Compares information against multiple trusted sources and fact-checking databases for comprehensive validation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaChartLine className="w-6 h-6 text-[#1A237E] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Scoring</h3>
                    <p className="text-gray-600">Provides instant credibility scores and detailed breakdown of factors affecting the content's reliability.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Truth Health Score</span>
                    <span className="text-2xl font-bold text-green-600">87/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <FaCheck className="inline mr-2 text-green-500" />
                    Sources verified • No manipulation detected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technique Tutor Section */}
      <section id="tutor" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Learning Module</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <FaLightbulb className="w-5 h-5 text-yellow-500 mr-3" />
                    <span className="text-yellow-800 text-sm font-medium">Appeal to Emotion detected</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">
                    This content uses emotional language to bypass logical reasoning. Learn how to identify and counter this technique.
                  </p>
                  <button className="text-[#1A237E] text-sm font-medium hover:underline">
                    View detailed explanation →
                  </button>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="bg-[#1A237E] p-4 rounded-full mr-4">
                  <FaGraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Technique Tutor
                </h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Learn to recognize common manipulation techniques and logical fallacies with our educational insights and detailed explanations.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaLightbulb className="w-6 h-6 text-[#1A237E] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Learning</h3>
                    <p className="text-gray-600">Get real-time explanations of manipulation techniques as they're detected in content you analyze.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaUsers className="w-6 h-6 text-[#1A237E] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Knowledge Base</h3>
                    <p className="text-gray-600">Access a comprehensive library of manipulation techniques compiled by media literacy experts.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaChartLine className="w-6 h-6 text-[#1A237E] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                    <p className="text-gray-600">Monitor your media literacy skills development and track your improvement over time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Source Credibility Section */}
      <section id="credibility" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#1A237E] p-4 rounded-full mr-4">
                  <FaShieldAlt className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Source Credibility
                </h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive source analysis and credibility scoring to help you evaluate the reliability of information and its origins.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaDatabase className="w-6 h-6 text-[#1A237E] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Domain Authority Analysis</h3>
                    <p className="text-gray-600">Evaluates website reputation, publication history, and editorial standards to assess source quality.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaUsers className="w-6 h-6 text-[#1A237E] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Citations</h3>
                    <p className="text-gray-600">Checks for proper attribution, expert quotes, and references to authoritative sources.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaChartLine className="w-6 h-6 text-[#1A237E] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Historical Performance</h3>
                    <p className="text-gray-600">Analyzes the source's track record for accuracy, corrections, and factual reporting over time.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Source Analysis</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Domain Authority</span>
                    <span className="font-medium text-blue-600">85/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Publication History</span>
                    <span className="font-medium text-blue-600">92/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Expert Citations</span>
                    <span className="font-medium text-blue-600">78/100</span>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-semibold">Overall Score</span>
                      <span className="text-2xl font-bold text-green-600">85/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A237E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Navigate Digital Truth?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Satya to help them identify misinformation and make informed decisions.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[#1A237E] font-bold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg hover:bg-gray-100 transform hover:scale-105"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Satya</h3>
              <p className="text-gray-400">Navigate Digital Truth with Confidence</p>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Satya. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}