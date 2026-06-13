import { useParams, useNavigate } from 'react-router-dom'
import { mockWikiArticles } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const categoryColor: Record<string, any> = { Policies: 'info', Procedures: 'success', Training: 'warning' }

// Very simple markdown renderer
function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith('## ')) return <h2 key={i} className="text-base font-semibold text-slate-100 mt-4 mb-2 border-b border-slate-700 pb-1">{line.slice(3)}</h2>
        if (line.startsWith('### ')) return <h3 key={i} className="text-sm font-semibold text-slate-200 mt-3">{line.slice(4)}</h3>
        if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc text-slate-300">{line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</li>
        if (line.match(/^\d+\. /)) return <li key={i} className="ml-4 list-decimal text-slate-300">{line.replace(/^\d+\. /, '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>
        if (line.startsWith('|')) return <div key={i} className="text-xs text-slate-400 font-mono bg-slate-700/30 px-2 py-0.5 rounded">{line}</div>
        if (line === '') return <div key={i} className="h-2" />
        return <p key={i}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
      })}
    </div>
  )
}

export default function WikiArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const article = mockWikiArticles.find(a => a.slug === slug)

  if (!article) return (
    <div className="text-center py-12">
      <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
      <p className="text-sm text-slate-400">Article not found</p>
      <Button variant="ghost" size="sm" className="mt-3" onClick={() => navigate('/wiki')}>Back to Wiki</Button>
    </div>
  )

  return (
    <div className="space-y-4 max-w-3xl">
      <Button variant="ghost" size="sm" onClick={() => navigate('/wiki')} className="text-slate-400 hover:text-slate-200 -ml-2">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Wiki
      </Button>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Badge variant={categoryColor[article.category] ?? 'secondary'}>{article.category}</Badge>
            {article.isPublished && <Badge variant="success">Published</Badge>}
          </div>
          <h1 className="text-xl font-bold text-slate-100 mb-3">{article.title}</h1>
          <div className="flex items-center gap-4 text-[10px] text-slate-500 mb-6 pb-4 border-b border-slate-700">
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.authorName}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Updated {formatDate(article.updatedAt)}</span>
            {article.publishedAt && <span>Published {formatDate(article.publishedAt)}</span>}
          </div>
          <SimpleMarkdown text={article.body} />
        </CardContent>
      </Card>
    </div>
  )
}
