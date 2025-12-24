import BirthdayManager from '@/components/BirthdayManager'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "PensaNIOS - Lembre dos Aniversários dos Seus Filhos | App Grátis",
  description: "Sempre esquece os aniversários? O PensaNIOS ajuda você a lembrar dos aniversários dos seus filhos, família e amigos. Calcule idades automaticamente. Grátis.",
  keywords: ["aniversário", "lembrete aniversário", "idade filhos", "calculadora idade", "app aniversário", "lembrar aniversário filhos", "calendário aniversários família"],
  alternates: {
    canonical: "https://cumpleanios.pensanta.com/pt",
    languages: {
      'es': 'https://cumpleanios.pensanta.com',
      'en': 'https://cumpleanios.pensanta.com/en',
      'pt': 'https://cumpleanios.pensanta.com/pt',
    },
  },
  openGraph: {
    title: "PensaNIOS - Nunca Mais Esqueça um Aniversário",
    description: "App grátis para lembrar aniversários dos seus filhos e família. Calcule idades, dias até o próximo aniversário. Para pais esquecidos.",
    locale: "pt_BR",
  },
}

export default function PortugueseHome() {
  return (
    <main id="main-content" className="container-main border-01" role="main">
      <BirthdayManager locale="pt" />
    </main>
  )
}
