import { Scissors } from 'lucide-react'

const LoadingSpinner = ({ size = 'md', text = null }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer spinning circle */}
        <div className="absolute inset-0 border-4 border-accent-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary-400 rounded-full border-t-transparent animate-spin"></div>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Scissors className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'} text-primary-400 animate-pulse`} />
        </div>
      </div>
      
      {text && (
        <p className="mt-4 text-secondary-600 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner