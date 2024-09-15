const Header = (): JSX.Element => {
  return (
    <header className="fixed w-full p-4 bg-custom-teal text-4xl text-white border-b border-b-white">
      <div className="flex justify-between">
        <p>Murojaah</p>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // @ts-expect-error expected type
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
