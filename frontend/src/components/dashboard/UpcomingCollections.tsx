import { Phone, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockUpcomingCollections } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function UpcomingCollections() {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-400" />Upcoming & Overdue Collections</span>
          <Badge variant="warning">{mockUpcomingCollections.length} loans</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loan #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Amount Due</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUpcomingCollections.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs text-slate-400">{item.loanNumber}</TableCell>
                <TableCell className="font-medium text-slate-200">{item.clientName}</TableCell>
                <TableCell className="text-slate-400 text-xs">{item.phone}</TableCell>
                <TableCell className="text-right font-semibold text-white">{formatCurrency(item.amount)}</TableCell>
                <TableCell className="text-xs">
                  <span className={cn(item.daysUntilDue < 0 ? 'text-red-400' : item.daysUntilDue <= 3 ? 'text-amber-400' : 'text-slate-400')}>
                    {item.daysUntilDue < 0 ? `${Math.abs(item.daysUntilDue)}d overdue` : `in ${item.daysUntilDue}d`}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={item.daysUntilDue < 0 ? 'danger' : item.daysUntilDue <= 3 ? 'warning' : 'success'} className="text-xs">
                    {item.daysUntilDue < 0 ? 'Overdue' : item.daysUntilDue <= 3 ? 'Due Soon' : 'Upcoming'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="xs" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                    <Phone className="w-3 h-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
