import BirthdayManager from '@/components/BirthdayManager'

export default function Home() {
  return (
    <main id="main-content" className="container-main border-01" role="main">
      <BirthdayManager locale="es" />
    </main>
  )
}
