import { Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingActionButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Link
        to="/contact"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-white shadow-lg transition hover:scale-105"
      >
        <Mail className="h-5 w-5" />
      </Link>

      <Link
        to="/report"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:scale-105"
      >
        <MessageSquare className="h-5 w-5" />
      </Link>
    </div>
  );
};

export default FloatingActionButton;