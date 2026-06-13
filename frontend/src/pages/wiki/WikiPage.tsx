import { useState } from 'react'
import { mockWikiArticles } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { BookOpen, Search, FileText, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

const categoryColor: Record<string, any> = {
  Policies: 'info', Procedures: 'success', Training: 'warning',
}

export default function WikiPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const navigate = useNavigate()

  const categories = ['ALL', ...Array.from(new Set(mockWikiArticles.map(a => a.category)))]
  const filtered = mockWikiArticles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.body.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'ALL' || a.category === category
    return matchSearch && matchCat && a.isPublished
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Internal Wiki</h1>
          <p className="text-xs text-slate-500">Policies, procedures, training guides, and staff manuals</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search wiki articles..." className="pl-9" />
        </div>
        <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${category === cat ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>{cat}</button>
          ))}
        </div>
        <span className="text-xs text-slate-500">{filtered.length} articles</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(article => (
          <Card key={article.id} className="bg-slate-800 border-slate-700 hover:border-emerald-500/50 cursor-pointer transition-colors" onClick={() => navigate(`/wiki/${article.slug}`)}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-slate-100">{article.title}</h3>
                    <Badge variant={categoryColor[article.category] ?? 'secondary'} className="text-[10px]">{article.category}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{article.body.replace(/#{1,6} /g, '').slice(0, 120)}...</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Updated {formatDate(article.updatedAt)}</span>
                    <span>By {article.authorName}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No articles found</p>
          <p className="text-xs text-slate-500 mt-1">Try a different search term or category</p>
        </div>
      )}
    </div>
  )
}
