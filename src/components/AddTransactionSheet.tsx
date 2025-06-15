
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as React from "react";

interface AddTransactionSheetProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const AddTransactionSheet = ({ isOpen, onOpenChange }: AddTransactionSheetProps) => {
    const [date, setDate] = React.useState<Date>();
    
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a new transaction</SheetTitle>
          <SheetDescription>
            Track your spending and income. Fill out the form below.
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <RadioGroup defaultValue="expense" className="col-span-3 flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expense" id="r1" />
                        <Label htmlFor="r1">Expense</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="income" id="r2" />
                        <Label htmlFor="r2">Income</Label>
                    </div>
                </RadioGroup>
            </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" placeholder="e.g. Coffee" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input id="amount" type="number" placeholder="e.g. 4.50" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="food">Food & Drinks</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
             <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal col-span-3",
                        !date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    />
                </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTransactionSheet;
