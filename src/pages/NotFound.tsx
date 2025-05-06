import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`404 error: ${location.pathname} not found`);
  }, [location]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-grow overflow-auto flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2 text-lg text-muted-foreground">Page not found</p>
          <p className="mt-4 text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button>Go back home</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
