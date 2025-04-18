import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useUi } from '../../contexts/UiContext';

export default function Layout() {
  const { isRtl } = useUi();
  
  return (
    <div className={isRtl ? 'dir-rtl' : 'dir-ltr'}>
      <Header />
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}