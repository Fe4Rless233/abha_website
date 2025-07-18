import type { FC } from 'react'

const HomePage: FC = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to ABHA
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Association of Bengalis in Harrisburg Area
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Celebrating Bengali culture and fostering community connections in Pennsylvania. 
            Join us for cultural events, festivals, and community activities.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
