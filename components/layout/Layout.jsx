import Footer from './Footer';
import MainNavigation from './MainNavigation';

const Layout = props => {
  return (
    <div>
      <MainNavigation />
      <main className="main">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
