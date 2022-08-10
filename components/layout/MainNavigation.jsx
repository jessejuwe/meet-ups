import Link from 'next/link';

const MainNavigation = () => {
  return (
    <nav className="header">
      <div className="logo">Vacations</div>
      <header>
        <ul>
          <li>
            <Link href="/">Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">New Meetup</Link>
          </li>
        </ul>
      </header>
    </nav>
  );
};

export default MainNavigation;
