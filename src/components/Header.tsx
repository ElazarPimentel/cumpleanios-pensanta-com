import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import LogoutButton from './LogoutButton';

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="container-main border-01 header" role="banner">
      <div className="header-container">
        <Link href="/" aria-label="Ir a inicio" className="logo">
          <h1>PensaNIOS</h1>
        </Link>
        {user && (
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
}
