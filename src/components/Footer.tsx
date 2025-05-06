const Footer = () => {
  return (
    <div
      className="py-2 px-4 text-center text-sm text-muted-foreground bg-background border-t border-border/30"
      style={{ height: "50px", alignContent: "center" }}
    >
      &copy; {new Date().getFullYear()} Resume Align. All rights reserved.
    </div>
  );
};

export default Footer;