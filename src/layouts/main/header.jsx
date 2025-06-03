import HeaderDesktop from './components/header-desktop'
import HeaderMobile from './components/header-mobile'

function Header() {
  return (
    <header className="w-full">
      <HeaderMobile />
      <HeaderDesktop />
    </header>
  )
}

export default Header
