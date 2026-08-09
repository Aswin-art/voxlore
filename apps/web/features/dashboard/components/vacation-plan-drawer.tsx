"use client"

import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar01Icon,
  Location01Icon,
  Delete01Icon,
  FireIcon,
} from "@hugeicons/core-free-icons"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@workspace/ui/components/drawer"
import { useVacationPlan } from "@/hooks/use-vacation-plan"

interface VacationPlanDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VacationPlanDrawer({ open, onOpenChange }: VacationPlanDrawerProps) {
  const { items, removeItem, clearPlan } = useVacationPlan()

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-card text-foreground">
        <div className="p-5 pb-2">
          <DrawerTitle className="text-lg font-extrabold">Rencana Liburan Saya</DrawerTitle>
          <DrawerDescription className="text-xs text-muted-foreground">
            Festival &amp; destinasi yang kamu simpan untuk perjalanan.
          </DrawerDescription>
        </div>

        <div className="px-5 py-3 flex flex-col gap-2.5 max-h-[50vh] overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center bg-background rounded-3xl border border-border flex flex-col items-center gap-2">
              <HugeiconsIcon icon={Calendar01Icon} className="w-9 h-9 text-muted-foreground/30" />
              <span className="text-xs font-extrabold">Rencana masih kosong</span>
              <span className="text-[11px] text-muted-foreground">
                Ketuk &quot;Tambah ke Rencana&quot; pada festival yang ingin dikunjungi.
              </span>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 bg-background rounded-2xl border border-border"
              >
                {item.image ? (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="48px" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={item.type === "festival" ? Calendar01Icon : FireIcon} className="w-5 h-5" />
                  </div>
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-500">
                      {item.type === "festival" ? "Festival" : "Destinasi"}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold truncate">{item.title}</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground truncate">
                    <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 shrink-0" />
                    {item.location}
                  </span>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Hapus dari rencana"
                  className="w-8 h-8 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors cursor-pointer shrink-0"
                >
                  <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="px-5 pb-5">
            <button
              onClick={clearPlan}
              className="w-full py-3 rounded-2xl border border-destructive/30 text-destructive text-xs font-extrabold hover:bg-destructive/10 transition-colors cursor-pointer"
            >
              Kosongkan Rencana
            </button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}