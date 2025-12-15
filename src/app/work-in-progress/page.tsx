export default function WorkInProgress() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          🚧 Work in Progress
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          This feature is currently under development.
          We’re building something great — check back soon!
        </p>

        <a
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full
                     bg-black text-white font-medium
                     transition-all duration-300
                     hover:bg-gray-800 hover:scale-105"
        >
          Go Back Home
        </a>
      </div>
    </div>
  )
}