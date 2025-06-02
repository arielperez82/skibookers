import { Suspense, useEffect, useState } from 'react'
import { useLink } from '@shared/adapters/web-ui/hooks/useLink'
import { useNavigationParams } from '@shared/adapters/web-ui/hooks/useNavigationParams'
import { useImage } from '@shared/adapters/web-ui/hooks/useImage'
import { type Resort } from '@resort-discovery/domain/entities/resort.entity'

function skillIcon(skill: string) {
  if (skill === 'Beginner') return <span title="Beginner" className="text-green-500 text-lg">●</span>;
  if (skill === 'Intermediate') return <span title="Intermediate" className="text-blue-500 text-lg">■</span>;
  if (skill === 'Advanced') return <span title="Advanced" className="text-black text-lg">◆</span>;
  return null;
}

function ResultsPageContent() {
  const [resorts, setResorts] = useState<Resort[]>([])
  const [loading, setLoading] = useState(true)
  const navigationParams = useNavigationParams()
  const paramsString = navigationParams.toString()
  const Link = useLink()
  const Image = useImage()
  
  useEffect(() => {
    async function fetchResorts() {
      setLoading(true)
      try {
        const url = paramsString ? `/api/personalization/recommendation?${paramsString}` : '/api/resorts'
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setResorts(data.resorts)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setResorts([])
      } finally {
        setLoading(false)
      }
    }
    fetchResorts()
  }, [paramsString])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Recommended Resorts</h1>
      {loading ? (
        <div>Loading resorts...</div>
      ) : resorts.length === 0 ? (
        <div>No resorts found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resorts.map((resort) => (
            <div
              key={resort.id}
              data-testid="resort-card"
              className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden border border-gray-100 hover:shadow-lg transition"
            >
              <Image
                src={resort.image}
                alt={resort.name}
                className="w-full h-44 object-cover"
                width={600} 
                height={400}
              />
              <div className="flex-1 flex flex-col justify-between p-4">
                <div className="mb-1">
                  <div className="font-semibold text-base truncate">
                    <Link href={`/resort/${resort.id}`} className="hover:underline" data-testid="resort-details">
                      {resort.name}
                    </Link>
                  </div>
                  <div className="text-primary text-xs font-semibold mt-0.5">{resort.match}% match</div>
                </div>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{resort.description}</p>
                <div className="flex items-end justify-between gap-2 mb-4 mt-2">
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-2xl">{resort.conditions.icon}</span>
                    <span className="text-xs text-gray-500 mt-1">Conditions</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    {skillIcon(resort.skill)}
                    <span className="text-xs text-gray-500 mt-1">Skill</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-base font-semibold">{resort.runs}</span>
                    <span className="text-xs text-gray-500 mt-1">Runs</span>
                  </div>
                </div>
                <Link
                  href={`/bundle/${resort.id}`}
                  className="block w-full mt-auto px-4 py-2 bg-primary text-white rounded-md text-center font-medium hover:bg-gray-900 transition"
                >
                  View Bundle Options
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function ResultsPage() {
  return (
    <Suspense>
      <ResultsPageContent />
    </Suspense>
  )
} 