import { useState } from 'react'
import { mockAnnouncements } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Megaphone, Plus, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', body: '', priority: 'MEDIUM' })

  const handleCreate = () => {
    if (!form.title.trim()) return
    setAnnouncements(prev => [{
      id: `a${Date.now()}`, ...form, isActive: true,
      createdBy: 'Daliso Phiri', createdAt: new Date().toISOString().slice(0, 10)
    }, ...prev])
    setOpen(false)
    setForm({ title: '', body: '', priority: 'MEDIUM' })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Announcements</h1>
          <p className="text-xs text-slate-500">Internal notice board — staff notices, targets, policy changes</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Announcement
        </Button>
      </div>

      <div className="space-y-3">
        {announcements.map(a => (
          <Card key={a.id} className={`bg-slate-800 border-slate-700 ${a.priority === 'HIGH' ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-blue-500'}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.priority === 'HIGH' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                    <Megaphone className={`w-4 h-4 ${a.priority === 'HIGH' ? 'text-amber-400' : 'text-blue-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-slate-100">{a.title}</h3>
                      <Badge variant={a.priority === 'HIGH' ? 'warning' : 'info'} className="text-[10px]">{a.priority}</Badge>
                      {a.isActive && <Badge variant="success" className="text-[10px]">ACTIVE</Badge>}
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{a.body}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(a.createdAt)}</span>
                      <span className="text-[10px] text-slate-500">By {a.createdBy}</span>
                      {(a as any).expiresAt && <span className="text-[10px] text-amber-400">Expires {formatDate((a as any).expiresAt)}</span>}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="xs" className="text-slate-500 hover:text-red-400 shrink-0"
                  onClick={() => setAnnouncements(prev => prev.filter(x => x.id !== a.id))}>
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {announcements.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No announcements</p>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-lg">
          <DialogHeader><DialogTitle className="text-slate-100">New Announcement</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="space-y-1.5"><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Announcement title" /></div>
            <div className="space-y-1.5">
              <Label>Priority</Label>
              <select value={form.priority} onChange={e => setForm(f => ({...f, priority: e.target.value}))} className="w-full h-9 rounded-md border border-slate-600 bg-slate-700/50 text-slate-100 text-sm px-3">
                <option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Message</Label>
              <textarea value={form.body} onChange={e => setForm(f => ({...f, body: e.target.value}))} rows={4} placeholder="Write your announcement here..." className="w-full rounded-md border border-slate-600 bg-slate-700/50 text-slate-100 text-sm p-3 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={handleCreate}>Post Announcement</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
