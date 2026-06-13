import { Printer } from 'lucide-react'
import { Button } from './button'

export function PrintableDocument({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-end mb-4 print:hidden">
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Printer className="w-4 h-4 mr-2" /> Print / Save PDF
        </Button>
      </div>
      <div id="printable" className="bg-white text-slate-900 rounded-lg p-8 print:p-0 print:shadow-none shadow-lg">
        {children}
      </div>
      <style>{`@media print { body * { visibility: hidden; } #printable, #printable * { visibility: visible; } #printable { position: absolute; left: 0; top: 0; width: 100%; } }`}</style>
    </div>
  )
}
