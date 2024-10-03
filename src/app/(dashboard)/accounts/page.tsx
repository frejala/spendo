"use client";

import { DataTable } from "@/components/table/data-table";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

import { Payment, columns } from "@/app/(dashboard)/accounts/columns";

const dump_data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728123kas",
    amount: 100,
    status: "pending",
    email: "a@example.com",
  },
];

const AccountsPage = () => {
  const { onOpen } = useNewAccount();

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={dump_data}
            filterKey="email"
            onDelete={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
