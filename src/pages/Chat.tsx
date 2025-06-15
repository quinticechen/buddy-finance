
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, PawPrint } from "lucide-react";

const Chat = () => {
  return (
    <Card className="h-[calc(100vh-10rem)] flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="border-2 border-primary">
            <div className="bg-primary h-full w-full flex items-center justify-center">
                <PawPrint className="h-6 w-6 text-primary-foreground" />
            </div>
        </Avatar>
        <div>
            <p className="text-lg font-semibold">FinWise Buddy</p>
            <p className="text-sm text-muted-foreground">Your playful financial assistant</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto p-4 space-y-4">
        <div className="flex items-start gap-4">
            <Avatar className="border-2 border-primary">
                <div className="bg-primary h-full w-full flex items-center justify-center">
                    <PawPrint className="h-6 w-6 text-primary-foreground" />
                </div>
            </Avatar>
            <div className="grid gap-1">
                <div className="font-bold">FinWise Buddy</div>
                <div className="prose prose-sm bg-muted p-3 rounded-lg max-w-xs">
                    <p>Hey there! Ready to talk about your money? Or are you just here to see what mischief I'm up to? 😉</p>
                </div>
            </div>
        </div>
        <div className="flex items-start gap-4 justify-end">
            <div className="grid gap-1 text-right">
                <div className="font-bold">You</div>
                <div className="prose prose-sm bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                    <p>How much did I spend on coffee this month?</p>
                </div>
            </div>
            <Avatar>
                <AvatarImage src="/placeholder.svg" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
            </Avatar>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder="Ask FinWise Buddy a question..." className="flex-1" />
            <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Chat;
