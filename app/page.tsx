import Link from 'next/link';
import { FaBrain, FaGraduationCap, FaShieldAlt } from 'react-icons/fa';
import Header from './_components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-logo-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Navigate Digital Truth
            <span className="block text-[#1A237E]">with Confidence</span>
          </h1>
          <p className="relative z-10 text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Cut through misinformation with AI-powered analysis. Verify sources, identify manipulation techniques, 
            and make informed decisions in the digital age.
          </p>
          <Link
            href="/signup"
            className="relative z-10 inline-block bg-[#1A237E] hover:bg-[#283593] text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Digital Truth
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced AI technology helps you navigate the complex world of digital information.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Link href="/features#deconstruction">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:scale-105 transform duration-300 cursor-pointer">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#1A237E] p-4 rounded-full">
                    <FaBrain size={32} color="white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  AI-Powered Deconstruction
                </h3>
                <p className="text-gray-600">
                  Advanced machine learning algorithms analyze text, images, and sources to identify 
                  potential misinformation and manipulation tactics.
                </p>
              </div>
            </Link>

            {/* Feature 2 */}
            <Link href="/features#tutor">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:scale-105 transform duration-300 cursor-pointer">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#1A237E] p-4 rounded-full">
                    <FaGraduationCap size={32} color="white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Technique Tutor
                </h3>
                <p className="text-gray-600">
                  Learn to recognize common manipulation techniques and logical fallacies 
                  with our educational insights and detailed explanations.
                </p>
              </div>
            </Link>

            {/* Feature 3 */}
            <Link href="/features#credibility">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:scale-105 transform duration-300 cursor-pointer">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#1A237E] p-4 rounded-full">
                    <FaShieldAlt size={32} color="white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Source Credibility
                </h3>
                <p className="text-gray-600">
                  Comprehensive source analysis and credibility scoring to help you 
                  evaluate the reliability of information and its origins.
                </p>
              </div>
            </Link>
          </div>
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
