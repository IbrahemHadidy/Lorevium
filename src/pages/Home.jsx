import heroBg from "@/Pictures/hero-bg.webp";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="fixed inset-0 h-screen w-screen">
          <img
            src={heroBg}
            alt="Hero Background"
            fill
            className="object-cover"
            quality={75}
            priority
          />
          <div className="bg-background/50 absolute inset-0" />
        </div>

        {/* Content */}
        <div className="text-foreground relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold lg:text-6xl">
            Welcome to Lorevium
          </h1>
          <p className="mt-4 max-w-2xl text-lg lg:text-xl">
            Learn new skills and advance your career with our expert-led courses
            in tech, business, and creative skills. Get started today!
          </p>
          <Link to="/lessons">
            <Button className="mt-6" variant="outline">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <footer className="text-muted-foreground bg-background relative z-50 w-full border-t p-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Lorevium. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
