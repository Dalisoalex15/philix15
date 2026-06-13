import { mockCommunicationLogs, mockClients } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Timeline, TimelineItem } from '@/components/ui/Timeline'
import { MessageSquare, Search, Filter } from 'lucide-react'
import { useState } from 'react'

const channelBadgeVariant: Record<string, any> = {
  CALL: 'info', EMAIL: 'success', SMS: 'warning', WHATSAPP: 'success', VISIT: 'purple',
}

export default function CommunicationHistoryPage() {
  const [search, setSearch] = useState('')
  const [channel, setChannel] = useState('ALL')

  const filtered = mockCommunicationLogs.filter(log => {
    const matchSearch = log.clientName.toLowerCase().includes(search.toLowerCase()) || log.summary.toLowerCase().includes(search.toLowerCase())
    const matchChannel = channel === 'ALL' || log.channel === channel
    return matchSearch && matchChannel
  }).sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime())

  const grouped = filtered.reduce((acc: Record<string, typeof filtered>, log) => {
    const key = log.clientName
    if (!acc[key]) acc[key] = []
    acc[key].push(log)
    return acc
  }, {})

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Communication History</h1>
        <p className="text-xs text-slate-500">Full timeline of all client contacts — calls, emails, visits, messages</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by client or summary..." className="pl-9" />
        </div>
        <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
          {['ALL', 'CALL', 'EMAIL', 'SMS', 'WHATSAPP', 'VISIT'].map(ch => (
            <button key={ch} onClick={() => setChannel(ch)} className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${channel === ch ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>{ch}</button>
          ))}
        </div>
        <span className="text-xs text-slate-500">{filtered.length} logs</span>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No communication logs found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([clientName, logs]) => (
            <Card key={clientName} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-slate-200">{clientName}</CardTitle>
                  <div className="flex gap-1">
                    {[...new Set(logs.map(l => l.channel))].map(ch => (
                      <Badge key={ch} variant={channelBadgeVariant[ch] ?? 'secondary'} className="text-[10px]">{ch}</Badge>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500">{logs.length} interaction{logs.length !== 1 ? 's' : ''}</p>
              </CardHeader>
              <CardContent>
                <Timeline>
                  {logs.map(log => (
                    <TimelineItem key={log.id} channel={log.channel} summary={log.summary} outcome={log.outcome} loggedBy={log.loggedBy} loggedAt={log.loggedAt} followUpDate={log.followUpDate} />
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
