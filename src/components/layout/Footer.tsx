const Footer = () => {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Sports Activities Centre
          </h3>

          <p>BITS Pilani, Goa Campus</p>
        </div>

        <div className="flex gap-4">
          <p>Activities</p>
          <p>Events</p>
          <p>Contact</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;