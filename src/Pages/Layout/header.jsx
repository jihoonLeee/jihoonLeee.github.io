import {  useState ,useContext} from 'react' // Fragment,
import { Dialog, Popover } from '@headlessui/react' //, Transition
import {
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";
import { AuthContext } from '../../Modules/AuthProvider';
import axios from 'axios';
import UserAvatar from '../../Components/UserAvatar';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { authenticated ,userInfo} = useContext(AuthContext);

  const StyledButton = ({ to, children, onClick }) => (
    <button 
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-rose-600 hover:bg-rose-100 hover:text-rose-900 focus:bg-rose-100 focus:text-rose-900 dark:text-rose-300 dark:hover:bg-rose-800 dark:hover:text-rose-50 dark:focus:bg-rose-800 dark:focus:text-rose-50"
        onClick={onClick}
    >
        <Link to={to} className="text-sm font-semibold leading-6 text-gray-900">{children}</Link>
    </button>
  );
  const DialogPanel = ({ children, ...props }) => (
    <Dialog.Panel 
      className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10" 
      {...props}
    >
      {children}
    </Dialog.Panel>
  );

  const NavLink = ({ to, children }) => (
    <Link 
      to={to} 
      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" 
      onClick={() => setMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );
  return (
    <header className="header">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">WagWagT</span>
            <img className="h-16 w-auto" src={`${process.env.PUBLIC_URL}/images/wagwagt_logo.png`} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <StyledButton to="/mainBoard">게시판</StyledButton>
          <StyledButton to="/dogBTI">개BTI</StyledButton>
          {/* <StyledButton to="/game">게임</StyledButton> */}
          <div className="flex flex-1 justify-end">
            { !authenticated ? (
              <>
                <StyledButton to="/login">로그인</StyledButton>
                <StyledButton to="/join">회원가입</StyledButton>
              </>
            ) : (
              <>
                <UserAvatar userName={userInfo.nickName}/>
                <StyledButton onClick={logout}>로그아웃</StyledButton>
              </>
            )}
          </div>
        </Popover.Group>  
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel>
          <div className="flex items-center justify-between">
            <a href="!#" className="-m-1.5 p-1.5">
              <span className="sr-only">WagWagT</span>
              <img className="h-8 w-auto" src="/images/dog_freinds_logo.png" alt="" />
            </a>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink to="/dogBoard">게시판</NavLink>
                <NavLink to="/dogBTI">개BTI</NavLink>
              </div>
              <div className="py-6">
                {!authenticated ? (
                  <>
                    <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">로그인</Link>
                    <Link to="/join" className="text-sm font-semibold leading-6 text-gray-900">회원가입</Link>
                  </>
                ) : (
                  <>
                    <UserAvatar userName={userInfo.nickName}/>
                    <button 
                      onClick={logout} 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-rose-600 hover:bg-rose-100 hover:text-rose-900 focus:bg-rose-100 focus:text-rose-900 dark:text-rose-300 dark:hover:bg-rose-800 dark:hover:text-rose-50 text-sm font-semibold leading-6 text-gray-900"
                    >
                      로그아웃
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
function logout() {
  axios({
    method: 'post',
    url: '/logout',
    withCredentials: true
  })
  .then((response) => {
    console.log(response);
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}
