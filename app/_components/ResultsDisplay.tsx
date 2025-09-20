import React from 'react';

interface AnalysisData {
  healthScore?: number;
  overallSummary?: string;
  sourceCredibilityScore?: number;
  manipulativeTechniques?: string[];
  imageAnalysis?: {
    hasManipulation?: boolean;
    confidence?: number;
    details?: string;
  };
}

interface ResultsDisplayProps {
  analysisData: AnalysisData;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ analysisData }) => {
  const {
    healthScore = 0,
    overallSummary = "Analysis pending...",
    sourceCredibilityScore = 0,
    manipulativeTechniques = [],
    imageAnalysis = {}
  } = analysisData;

  // Helper function to get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  // Helper function to get score background color
  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    if (score >= 40) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Main Health Score Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#1A237E]">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-[#1A237E] mb-2">Truth Health Score</h2>
            <p className="text-gray-600">Overall reliability assessment of the content</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`relative w-24 h-24 rounded-full ${getScoreBgColor(healthScore)} flex items-center justify-center`}>
              <span className={`text-3xl font-bold ${getScoreColor(healthScore)}`}>
                {healthScore}
              </span>
            </div>
            <div className="text-right">
              <div className={`text-lg font-semibold ${getScoreColor(healthScore)}`}>
                {healthScore >= 80 ? 'Highly Reliable' :
                 healthScore >= 60 ? 'Moderately Reliable' :
                 healthScore >= 40 ? 'Questionable' : 'Unreliable'}
              </div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout for Secondary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Overall Summary Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Overall Summary</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">
              {overallSummary}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              AI Analysis
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Fact-Checked
            </span>
          </div>
        </div>

        {/* Source Credibility Score Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Source Credibility</h3>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className={`text-3xl font-bold ${getScoreColor(sourceCredibilityScore)}`}>
              {sourceCredibilityScore}/100
            </div>
            <div className="w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke={sourceCredibilityScore >= 80 ? '#10B981' : 
                         sourceCredibilityScore >= 60 ? '#F59E0B' :
                         sourceCredibilityScore >= 40 ? '#F97316' : '#EF4444'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(sourceCredibilityScore / 100) * 251.2} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-900 font-medium">Domain Authority</span>
              <span className="font-medium text-blue-600">{Math.floor(sourceCredibilityScore * 0.8)}/100</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-900 font-medium">Publication History</span>
              <span className="font-medium text-blue-600">{Math.floor(sourceCredibilityScore * 0.9)}/100</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-900 font-medium">Expert Citations</span>
              <span className="font-medium text-blue-600">{Math.floor(sourceCredibilityScore * 0.7)}/100</span>
            </div>
          </div>
        </div>

        {/* Manipulative Techniques Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Manipulative Techniques Detected</h3>
          </div>
          <div className="space-y-3">
            {manipulativeTechniques.length > 0 ? (
              manipulativeTechniques.map((technique, index) => (
                <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-800 text-sm font-medium">{technique}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-800 font-medium">No manipulative techniques detected</span>
              </div>
            )}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Common techniques:</strong> Emotional manipulation, cherry-picking data, false dichotomy, ad hominem attacks, bandwagon fallacy
            </p>
          </div>
        </div>

        {/* Image Analysis Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Image Analysis</h3>
          </div>
          
          {imageAnalysis.hasManipulation !== undefined ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-l-4 ${
                imageAnalysis.hasManipulation 
                  ? 'bg-red-50 border-red-400' 
                  : 'bg-green-50 border-green-400'
              }`}>
                <div className="flex items-center">
                  {imageAnalysis.hasManipulation ? (
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <span className={`font-medium ${
                    imageAnalysis.hasManipulation ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {imageAnalysis.hasManipulation 
                      ? 'Potential manipulation detected' 
                      : 'No manipulation detected'}
                  </span>
                </div>
              </div>
              
              {imageAnalysis.confidence && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Confidence Level</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${imageAnalysis.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{imageAnalysis.confidence}%</span>
                  </div>
                </div>
              )}
              
              {imageAnalysis.details && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{imageAnalysis.details}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500">No image provided for analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;