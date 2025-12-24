import BirthdayManager from '@/components/BirthdayManager'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "PensaNIOS - Remember Your Kids' Birthdays | Free App",
  description: "Always forgetting birthdays? PensaNIOS helps you remember your kids', family and friends' birthdays. Auto-calculate ages and never miss a date again. Free.",
  keywords: ["birthday", "birthday reminder", "kids age", "age calculator", "birthday app", "remember kids birthday", "family birthday calendar"],
  alternates: {
    canonical: "https://cumpleanios.pensanta.com/en",
    languages: {
      'es': 'https://cumpleanios.pensanta.com',
      'en': 'https://cumpleanios.pensanta.com/en',
      'pt': 'https://cumpleanios.pensanta.com/pt',
    },
  },
  openGraph: {
    title: "PensaNIOS - Never Forget a Birthday Again",
    description: "Free app to remember your kids' and family birthdays. Calculate ages, days until next birthday, and more. For forgetful dads.",
    locale: "en_US",
  },
}

export default function EnglishHome() {
  return (
    <main id="main-content" className="container-main border-01" role="main">
      <BirthdayManager locale="en" />
    </main>
  )
}
