import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Socials from "./socials";

interface LinkType {
  name: string;
  href: string;
}

interface DropdownMenuProps {
  links: LinkType[];
  setIsOpen: (isOpen: boolean) => void;
}
export default function DropdownMenu({ links, setIsOpen }: DropdownMenuProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="absolute right-0 mt-4 w-48 bg-primary backdrop-blur-xs rounded-md shadow-lg py-1"
    >
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => setIsOpen(false)}
          className={clsx(
            "block font-medium px-4 py-2 text-palette-2",
            pathname === link.href
              ? "text-palette-3 bg-palette-2/10 underline underline-offset-2"
              : "text-palette-2 hover:underline hover:bg-palette-2/10 hover:underline-offset-2 hover:shadow-inner",
          )}
        >
          {link.name}
        </Link>
      ))}
      <Socials className="flex justify-end p-2 space-x-3" />
    </motion.div>
  );
}
