import type { ReactNode } from "react";
import { Lightbulb, TriangleAlert, Info } from "lucide-react";

type CalloutType = "tip" | "warning" | "info";

type IconComponent = typeof Lightbulb;

const STYLES: Record<CalloutType, { wrapper: string; icon: IconComponent; iconClass: string; label: string }> = {
  tip: {
    wrapper: "bg-lime-50 border-lime-500 text-lime-900 dark:bg-[#c5ff00]/5 dark:border-[#c5ff00]/50 dark:text-[#c5ff00]",
    icon: Lightbulb,
    iconClass: "text-lime-600 dark:text-[#c5ff00]",
    label: "Tip",
  },
  warning: {
    wrapper: "bg-amber-50 border-amber-400 text-amber-900 dark:bg-amber-950/50 dark:border-amber-600 dark:text-amber-200",
    icon: TriangleAlert,
    iconClass: "text-amber-500 dark:text-amber-400",
    label: "Atención",
  },
  info: {
    wrapper: "bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-950/50 dark:border-blue-600 dark:text-blue-200",
    icon: Info,
    iconClass: "text-blue-500 dark:text-blue-400",
    label: "Nota",
  },
};

interface Props {
  type?: CalloutType;
  children: ReactNode;
}

export default function Callout({ type = "info", children }: Props) {
  const { wrapper, icon: Icon, iconClass, label } = STYLES[type];

  return (
    <aside className={`my-4 flex gap-3 rounded-lg border-l-4 p-4 not-prose ${wrapper}`}>
      <Icon size={18} className={`shrink-0 mt-0.5 ${iconClass}`} aria-hidden="true" />
      <div>
        <p className="text-xs font-bold uppercase tracking-wide mb-1 opacity-70">{label}</p>
        <div className="text-sm leading-relaxed space-y-2">{children}</div>
      </div>
    </aside>
  );
}
