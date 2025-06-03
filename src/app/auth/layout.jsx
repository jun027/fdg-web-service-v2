function AuthLayout({ children }) {
  return (
    <div className="main-background relative flex flex-col gap-6 h-full sm:flex-row sm:gap-0 sm:h-screen overflow-hidden">
      <div className="relative aspect-[375/248] w-full bg-[url(/images/page/login/thumb-01-m.png)] bg-no-repeat bg-center bg-cover sm:bg-[url(/images/page/login/thumb-01.png)] sm:bg-right sm:aspect-[1058/1600] sm:w-[300px] lg:w-[529px] " />
      {children}

      {/* Decorative */}
      <div className="hidden pointer-events-none absolute top-[-40px] right-[-60px] w-[200px] aspect-[402/441] bg-[url(/images/icons/leaf-icon-02.png)] bg-no-repeat bg-center bg-cover sm:block" />
    </div>
  )
}

export default AuthLayout
