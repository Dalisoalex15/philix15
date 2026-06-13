import { useState } from 'react'
import { Plus, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mockUsers } from '@/data/mockData'
import { formatDateTime } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

const roleVariants: Record<string, any> = { SUPER_ADMIN: 'danger', MANAGER: 'purple', LOAN_OFFICER: 'success', COLLECTIONS_OFFICER: 'warning', ACCOUNTANT: 'info' }
const roleLabels: Record<string, string> = { SUPER_ADMIN: 'Super Admin', MANAGER: 'Manager', LOAN_OFFICER: 'Loan Officer', COLLECTIONS_OFFICER: 'Collections', ACCOUNTANT: 'Accountant' }

export default function UsersPage() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState('LOAN_OFFICER')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleAdd = () => {
    if (!firstName || !email) { toast({ title: 'Fill all fields', variant: 'destructive' }); return }
    toast({ title: 'User Created', description: `${firstName} ${lastName} added as ${roleLabels[role]}.` })
    setOpen(false)
    setFirstName(''); setLastName(''); setEmail('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold text-white">User Management</h2><p className="text-sm text-slate-400">{mockUsers.length} system users</p></div>
        <Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-1.5" />Add User</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(roleLabels).map(([key, label]) => (
          <Card key={key} className="bg-slate-800 border-slate-700">
            <CardContent className="p-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-400" />
              <div>
                <Badge variant={roleVariants[key]} className="text-xs">{label}</Badge>
                <p className="text-lg font-bold text-white mt-0.5">{mockUsers.filter(u => u.role === key).length}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="text-xs bg-slate-700">
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant={roleVariants[user.role]} className="text-xs">{roleLabels[user.role]}</Badge></TableCell>
                  <TableCell className="text-xs text-slate-400">{user.branch}</TableCell>
                  <TableCell className="text-xs text-slate-400">{formatDateTime(user.lastLogin)}</TableCell>
                  <TableCell><Badge variant={user.isActive ? 'success' : 'secondary'} className="text-xs">{user.isActive ? 'Active' : 'Inactive'}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="xs" variant="ghost">Edit</Button>
                      {user.isActive && <Button size="xs" variant="ghost" className="text-red-400">Deactivate</Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add New User</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>First Name</Label><Input value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Last Name</Label><Input value={lastName} onChange={e => setLastName(e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Branch</Label><Input defaultValue="Head Office" /></div>
            <div className="space-y-1.5"><Label>Temporary Password</Label><Input type="password" placeholder="Min. 8 characters" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
