import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

interface InfoSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InfoSheet = ({ open, onOpenChange }: InfoSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Information</SheetTitle>
        </SheetHeader>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/features" className="text-muted-foreground hover:text-foreground" onClick={() => onOpenChange(false)}>Features</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-foreground" onClick={() => onOpenChange(false)}>How It Works</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Examples</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground" onClick={() => onOpenChange(false)}>FAQ</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InfoSheet; 