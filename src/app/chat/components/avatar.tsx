export function Avatar({
  role,
  name,
  image
}: {
  role: 'system' | 'assistant' | 'user',
  name?: string | null
  image?: string | null 
}) {
  if (role === 'user' && image) {
    return <img src={image} className="w-9 h-9 bg-gray-500" alt="" />
  } else if (role === 'user') {
    return (
      <span className="w-9 h-9 bg-indigo-700 text-white font-bold flex items-center justify-center">
        {name ? name.charAt(0).toUpperCase() : 'U'}
      </span>
    )
  } else {
    return (
      <span className="w-9 h-9 flex items-center justify-center bg-amber-400 text-xl text-black font-bold">
        B
      </span>
    )
  }
}
