import {
  BookOpen,
  Brain,
  Calculator,
  Dna,
  FlaskConical,
  Globe,
  Landmark,
  Languages,
  Monitor,
  Newspaper,
  ShieldAlert,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import type { EditalIconName } from '../types/edital'

const iconMap: Record<EditalIconName, LucideIcon> = {
  BookOpen,
  Calculator,
  Landmark,
  Globe,
  Newspaper,
  Monitor,
  ShieldAlert,
  Brain,
  Users,
  Languages,
  Zap,
  FlaskConical,
  Dna,
}

export function getEditalDisciplineIcon(name: EditalIconName): LucideIcon {
  return iconMap[name] ?? BookOpen
}
