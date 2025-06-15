
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import AddTransactionSheet from "@/components/AddTransactionSheet";

const transactions = [
  // Sample data
  {
    id: "1",
    date: "2025-06-15",
    description: "Coffee Shop",
    category: "Food",
    amount: -4.5,
    type: "expense",
  },
  {
    id: "2",
    date: "2025-06-14",
    description: "Salary",
    category: "Income",
    amount: 2500,
    type: "income",
  },
  {
    id: "3",
    date: "2025-06-13",
    description: "Groceries",
    category: "Food",
    amount: -75.2,
    type: "expense",
  },
  {
    id: "4",
    date: "2025-06-12",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    type: "expense",
  },
];

const Transactions = () => {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                A list of your recent income and expenses.
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1" onClick={() => setIsSheetOpen(true)}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Transaction
                </span>
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      transaction.type === "income"
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddTransactionSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  );
};

export default Transactions;
